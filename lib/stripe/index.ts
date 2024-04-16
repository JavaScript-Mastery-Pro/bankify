import { AppFixedFee } from "@/constants";
import { calculateStripeFee, stripe } from "@/lib/utils";

// CREATE ACOUNT
export const createStripeAccount = async (user: {
  email: string;
  ssn: string;
}) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: user.email,
      business_type: "individual",
      individual: {
        email: user.email,
        id_number: user.ssn,
      },
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
    });

    return JSON.parse(JSON.stringify(account));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};

// CREATE ONBOARDING LINK
export const createOnboardingLink = async (stripeId: string) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: stripeId,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/refresh/${stripeId}`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      type: "account_onboarding",
    });

    return JSON.parse(JSON.stringify({ url: accountLink.url }));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
  }
};

// GET BALANCE
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

// RECEIVE DEPOSIT
export const sendDesposit = async ({
  amountInDollar,
  stripeId,
  userId,
  category,
  name,
  note,
}: {
  amountInDollar: number;
  stripeId: string;
  userId: string;
  category: string;
  name: string;
  note: string;
}) => {
  const stripeFee = calculateStripeFee(amountInDollar);
  const totalFee = stripeFee + AppFixedFee;
  const totalAmount = parseFloat((amountInDollar + totalFee).toFixed(2));

  console.log("sendDesposit");
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
          destination: stripeId,
        },
        description: "Deposit",
      },
      metadata: {
        amountInDollar,
        user: userId,
        category,
        name,
        note,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${stripeId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/return/${stripeId}`,
    });

    return JSON.parse(JSON.stringify({ url: session.url }));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get balance:",
      error
    );
  }
};
