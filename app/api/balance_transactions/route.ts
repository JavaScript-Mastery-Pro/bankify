import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const GET = async (request: NextRequest) => {
  // const { account } = await request.json();

  // stripeAccount: account,
  try {
    const balanceTransactions = await stripe.balanceTransactions.list({
      limit: 5,
      // stripeAccount: account
    });

    return NextResponse.json({ balanceTransactions });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get user balance:",
      error
    );
  }
};
