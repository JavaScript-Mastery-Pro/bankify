import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar, account } = await request.json();

  try {
    const transfer = await stripe.transfers.create({
      amount: amountInDollar * 100,
      currency: "usd",
      destination: account,
    });

    return NextResponse.json({ transfer });
  } catch (error) {
    console.error(
      "========An error occurred when calling the Stripe API to transfer balance:",
      error
    );
  }
};
