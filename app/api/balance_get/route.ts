import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: NextRequest) => {
  const { account } = await request.json();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: account,
    });

    return NextResponse.json({ balance });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get balance:",
      error
    );
  }
};
