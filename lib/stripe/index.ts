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
      country: "SG",
      email: user.email,
      business_type: "individual",
      individual: {
        email: user.email,
        id_number: user.ssn,
      },
      capabilities: {
        transfers: {
          requested: true,
        },
      },
      tos_acceptance: {
        service_agreement: "recipient",
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

// SEND DEPOSIT
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    return JSON.parse(JSON.stringify({ url: session.url, id: session.id }));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to get balance:",
      error
    );
  }
};

// GENERATE BANK TOKEN
export const generateBankToken = async ({
  accountHolderName,
  accountNumber,
  routingNumber,
}: {
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
}) => {
  try {
    const token = await stripe.tokens.create({
      bank_account: {
        country: "US",
        currency: "usd",
        account_holder_name: accountHolderName,
        account_holder_type: "individual",
        account_number: accountNumber, // "000123456789"
        routing_number: routingNumber, // "110000000"
      },
    });

    return JSON.parse(JSON.stringify(token));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};

// CREATE BANK
export const createExternalAccount = async ({
  stripeId,
  bankToken,
  userId,
}: {
  stripeId: string;
  bankToken: string;
  userId: string;
}) => {
  try {
    const externalAccount = await stripe.accounts.createExternalAccount(
      stripeId,
      {
        external_account: bankToken,
        metadata: {
          userId,
        },
      }
    );

    return JSON.parse(JSON.stringify(externalAccount));
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to add a bank:",
      error
    );
  }
};
