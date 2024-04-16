import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/config";

export const POST = async (request: Request) => {
  const { amountInDollar, origin, destination } = await request.json();

  try {
    const transfer = await stripe.transfers.create(
      {
        amount: amountInDollar * 100,
        currency: "usd",
        destination,
      },
      {
        stripeAccount: origin,
      }
    );
    return NextResponse.json({ transfer });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to transfer balance:",
      error
    );
  }
};
