import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/config";

export const DELETE = async (request: Request) => {
  const { accountId } = await request.json();

  try {
    const deletedAccount = await stripe.accounts.del(accountId);

    return NextResponse.json({ deletedAccount });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};
