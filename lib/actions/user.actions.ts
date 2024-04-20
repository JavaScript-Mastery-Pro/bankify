"use server";

import * as sdk from "node-appwrite";
import { CountryCode, Products } from "plaid";

import { plaidClient } from "@/lib/plaid/config";

import { account } from "../appwrite/serverConfig";

const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET!);

// ### SIGN-UP FLOW
// 1.Create appwrite user
// 2.Create a plaid link token and pass to Link widget
// 3.Exchange plaid public token
export const signUp = async ({ name, email, password }: SignUpParams) => {
  // 1.Create appwrite user
  const userId = "userId";

  // 2.CREATE PLAID LINK TOKEN
  const linkToken = await createLinkToken(userId);
  return JSON.parse(JSON.stringify(linkToken));
};

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (userId: string) => {
  try {
    const tokeParams = {
      user: {
        client_user_id: userId,
      },
      client_name: "Bankify",
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokeParams);

    return JSON.parse(JSON.stringify({ linkToken: response.data.link_token }));
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// EXCHANGE PLAID PUBLIC TOKEN
export const exchangePublicToken = async (publicToken: string) => {
  try {
    // Create appwrite user
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    console.log({ accessToken });
    console.log({ itemId });

    return JSON.parse(
      JSON.stringify({
        publicTokenExchange: "complete",
      })
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

//= ================================
// LOGOUT USER
export async function logoutAccount() {
  try {
    await account.deleteSession("current");
    return { loggedOut: true };
  } catch (error) {
    console.log(error);
  }
}
