import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar, bankId, account } = await request.json();

  try {
    const payout = await stripe.payouts.create(
      {
        amount: amountInDollar * 100,
        currency: "usd",
        method: "instant",
        description: bankId,
      },
      {
        stripeAccount: account,
      }
    );

    return NextResponse.json({ payout });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to payout:",
      error
    );
  }
};
