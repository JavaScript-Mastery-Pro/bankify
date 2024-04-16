import { stripe } from "@/lib/utils";

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
