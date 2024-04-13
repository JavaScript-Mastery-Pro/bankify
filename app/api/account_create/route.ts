import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { user } = await request.json();

  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: user.country,
      email: user.email,
      business_type: "individual",
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      settings: {
        payouts: {
          schedule: {
            interval: "manual",
          },
        },
      },
      tos_acceptance: {
        service_agreement: "recipient",
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
