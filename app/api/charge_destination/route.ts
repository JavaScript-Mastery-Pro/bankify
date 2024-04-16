import { NextResponse } from "next/server";

import { stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar, account, applicationFee } = await request.json();
  console.log("===============account", account);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountInDollar * 100,
            product_data: {
              name: "Deposit",
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: applicationFee * 100,
        transfer_data: {
          destination: account,
        },
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${account}`, // or 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${account}`,
    });

    console.log({ session });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to process destionation charge:",
      error
    );
  }
};
