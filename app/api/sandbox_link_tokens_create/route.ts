import { NextResponse } from "next/server";
import { ItemPublicTokenExchangeRequest, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

export const POST = async () => {
  try {
    const publicTokenParams = {
      institution_id: "ins_109508",
      initial_products: ["auth", "transactions", "identity"] as Products[],
    };

    const publicTokenResponse =
      await plaidClient.sandboxPublicTokenCreate(publicTokenParams);

    const publicToken = publicTokenResponse.data.public_token;
    // The generated public_token can now be exchanged
    // for an access_token
    const exchangeRequest: ItemPublicTokenExchangeRequest = {
      public_token: publicToken,
    };
    const exchangeTokenResponse =
      await plaidClient.itemPublicTokenExchange(exchangeRequest);
    const accessToken = exchangeTokenResponse.data.access_token;

    // returns the bank account and bank identification numbers
    const response = await plaidClient.authGet({
      access_token: accessToken,
    });
    const accountData = response.data.accounts;
    const accountId = accountData[0].account_id;
    // const numbers = response.data.numbers;

    return NextResponse.json({ accessToken, accountId });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to generate token:",
      error
    );
  }
};
