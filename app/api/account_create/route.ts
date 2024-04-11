import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { user } = await request.json();

  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: user.country,
      email: user.email,
      capabilities: {
        transfers: { requested: true },
      },
    });

    return NextResponse.json({ account: account.id });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};
