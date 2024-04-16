"use server";

import { stripe } from "../utils";

// CREATE ONBOARDING LINK
export const getBalance = async (stripeId: string) => {
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeId,
    });

    return JSON.parse(JSON.stringify(balance));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get balance:",
      error
    );
  }
};
