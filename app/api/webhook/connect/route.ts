/* eslint-disable camelcase */
import { BankAccount } from "@stripe/stripe-js";
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

    const newTransaction = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transactionsCollectionId,
      ID.unique(),
      {
        stripeTransactionId: id,
        amount: metadata?.amountInDollar
          ? (parseInt(metadata?.amountInDollar) / 100).toString()
          : "0",
        user: metadata?.userId! || "",
        category: metadata?.category! || "",
        name: metadata?.name! || "",
        note: metadata?.note! || "",
      }
    );

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  // CREATE BANK SUCCESS
  if (eventType === "account.external_account.created") {
    const externalAccount = event.data.object;
    console.log("account.external_account.created", event.data.object);

    const newExternalAccount = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.banksCollectionId,
      ID.unique(),
      {
        stripeBankId: externalAccount.id,
        accountHolderName: (externalAccount as BankAccount).account_holder_name,
        user: externalAccount?.metadata?.userId! || "",
        accountNumber: externalAccount.account,
        routingNumber: (externalAccount as BankAccount).routing_number,
        bankName: (externalAccount as BankAccount).bank_name,
      }
    );

    return NextResponse.json({ message: "OK", bank: newExternalAccount });
  }

  return new Response("", { status: 200 });
}
