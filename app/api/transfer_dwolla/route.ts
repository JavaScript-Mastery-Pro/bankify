import { NextResponse } from "next/server";
import { CountryCode, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

export const POST = async (request: Request) => {
  const { userId } = await request.json();

  // create a link token
  const tokeParams = {
    user: {
      client_user_id: userId,
    },
    client_name: "Horizon",
    products: ["auth"] as Products[],
    language: "en",
    country_codes: ["US"] as CountryCode[],
    account_selection_enabled: true,
  };

  try {
    const response = await plaidClient.linkTokenCreate(tokeParams);
    const linkToken = response.data.link_token;

    return NextResponse.json({ linkToken });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
