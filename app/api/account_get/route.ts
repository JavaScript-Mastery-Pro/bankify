import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/config";

export const POST = async (request: NextRequest) => {
  const { accountId } = await request.json();

  try {
    const account = await stripe.accounts.retrieve(accountId);

    return NextResponse.json({ account });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};
