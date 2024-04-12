import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: NextRequest) => {
  // const { account } = await request.json();

  try {
    const balanceTransactions = await stripe.balanceTransactions.list({
      // stripeAccount: account,
      limit: 3,
    });

    return NextResponse.json({ balanceTransactions });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get user balance:",
      error
    );
  }
};
