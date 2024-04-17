/* eslint-disable camelcase */
import { ID } from "appwrite";
import { NextResponse } from "next/server";
import stripe from "stripe";

import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/serverConfig";

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

    // const newTransaction = await databases.createDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.transactionsCollectionId,
    //   ID.unique(),
    //   {
    //     stripeTransactionId: id,
    //     amount: metadata?.amountInDollar
    //       ? (parseInt(metadata?.amountInDollar) / 100).toString()
    //       : "0",
    //     user: metadata?.userId! || "",
    //     category: metadata?.category! || "",
    //     name: metadata?.name! || "",
    //     note: metadata?.note! || "",
    //   }
    // );

    console.log({ metadata });
    const newTransaction = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transactionsCollectionId,
      ID.unique(),
      {
        stripeTransactionId: id,
        amount: "5",
        user: "661e9cdc0a1f3a357702",
        category: "Deposit",
        name: "nenad baltic",
        note: "Test depost",
      }
    );

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
