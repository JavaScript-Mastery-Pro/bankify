import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar } = await request.json();

  try {
    const topup = await stripe.topups.create({
      amount: amountInDollar / 100,
      currency: "usd",
      description: "Top-up for week of May 31",
      statement_descriptor: "Weekly top-up",
    });

    return NextResponse.json({ topup });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to top-up balance:",
      error
    );
  }
};
