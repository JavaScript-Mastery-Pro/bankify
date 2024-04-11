import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { account } = await request.json();

  try {
    const accountSession = await stripe.accountSessions.create({
      account,
      components: {
        account_onboarding: { enabled: true },
      },
    });

    console.log({ accountSession });

    return NextResponse.json({ client_secret: accountSession.client_secret });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account session",
      error
    );
  }
};
