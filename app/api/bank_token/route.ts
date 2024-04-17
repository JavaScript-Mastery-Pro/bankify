import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { accountName, routingNumber, accountNumber } = await request.json();

  try {
    const token = await stripe.tokens.create({
      bank_account: {
        country: "US",
        currency: "usd",
        account_holder_name: accountName,
        account_holder_type: "individual",
        routing_number: routingNumber, // "110000000"
        account_number: accountNumber, // "000123456789"
      },
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
