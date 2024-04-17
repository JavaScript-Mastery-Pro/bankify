import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { bankToken, account } = await request.json();

  try {
    const externalAccount = await stripe.accounts.createExternalAccount(
      account,
      {
        external_account: bankToken,
      }
    );

    return NextResponse.json({ externalAccount });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to add a bank:",
      error
    );
  }
};
