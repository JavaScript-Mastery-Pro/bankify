import { NextResponse } from "next/server";
import { CountryCode, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

export const POST = async (request: Request) => {
  const { userId } = await request.json();

  const tokeParams = {
    user: {
      client_user_id: userId,
    },
    client_name: "Bankify",
    products: ["auth"] as Products[],
    language: "en",
    country_codes: ["US"] as CountryCode[],
    account_selection_enabled: true,
  };

  try {
    const response = await plaidClient.linkTokenCreate(tokeParams);

    return NextResponse.json({ publicToken: response.data.link_token });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
