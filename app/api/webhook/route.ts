/* eslint-disable camelcase */
import { ID } from "appwrite";
import { NextResponse } from "next/server";
import stripe from "stripe";

import { appwriteConfig, databases } from "@/lib/appwrite/config";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE DEPOSIT SUCCESS
  if (eventType === "checkout.session.completed") {
    const { id, metadata } = event.data.object;

    const newTransaction = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transactionsCollectionId,
      ID.unique(),
      {
        stripeTransactionId: id,
        amount: metadata?.amountInDollar
          ? (parseInt(metadata?.amountInDollar) / 100).toString()
          : "0",
        user: metadata?.user! || "",
        category: metadata?.category! || "",
        name: metadata?.name! || "",
        note: metadata?.note! || "",
      }
    );

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
