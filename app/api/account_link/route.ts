import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { account } = await request.json();

  try {
    const accountLink = await stripe.accountLinks.create({
      account,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/refresh/${account}`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${account}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link:",
      error
    );
  }
};
