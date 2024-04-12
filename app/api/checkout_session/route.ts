import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar, account, applicationFee } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: (amountInDollar + applicationFee) * 100,
            product_data: {
              name: "Deposit",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${account}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${account}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create checkout session:",
      error
    );
  }
};
