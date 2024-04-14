import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { account } = await request.json();

  try {
    const externalAccounts = await stripe.accounts.listExternalAccounts(
      account,
      {
        object: "bank_account",
      }
    );

    return NextResponse.json({ externalAccounts });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an accountget bank accounts:",
      error
    );
  }
};
