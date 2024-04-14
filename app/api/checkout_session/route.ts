import { NextResponse } from "next/server";

import { AppFixedFee } from "@/constants";
import { calculateStripeFee, stripe } from "@/lib/utils";

export const POST = async (request: Request) => {
  const { amountInDollar, account } = await request.json();
  const stripeFee = calculateStripeFee(amountInDollar);
  const totalFee = stripeFee + AppFixedFee;

  const totalAmount = parseFloat((amountInDollar + totalFee).toFixed(2));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalAmount * 100,
            product_data: {
              name: "Deposit",
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: parseFloat(totalFee.toFixed(2)) * 100,
        transfer_data: {
          destination: account,
        },
        description: "Deposit",
      },
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
