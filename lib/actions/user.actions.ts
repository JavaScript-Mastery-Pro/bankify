"use server";

import * as sdk from "node-appwrite";
import { CountryCode, Products } from "plaid";

import { User } from "@/lib/appwrite/types";
import { plaidClient } from "@/lib/plaid/config";

import { account, appwriteConfig, databases } from "../appwrite/serverConfig";

const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET!);

// CREATE LINK
export const createLinkToken = async (accountId: string) => {
  const tokeParams = {
    user: {
      client_user_id: accountId,
    },
    client_name: "Bankify",
    products: ["auth"] as Products[],
    language: "en",
    country_codes: ["US"] as CountryCode[],
  };

  try {
    // Create appwrite user
    const response = await plaidClient.linkTokenCreate(tokeParams);

    return JSON.parse(JSON.stringify({ linkToken: response.data.link_token }));
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// EXCHANGE PUBLIC TOKEN
export const exchangePublicToken = async (publicToken: string) => {
  try {
    // Create appwrite user
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    // const itemID = response.data.item_id;
    console.log({ accessToken });

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

// GET ACCOUNTS
export const getAccounts = async () => {
  console.log("db", appwriteConfig.databaseId);
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.usersCollectionId!,
      [sdk.Query.equal("accountId", currentAccount.$id)]
    );
    const user = currentUser.documents[0] as User;

    const response = await plaidClient.accountsGet({
      access_token: user.accessToken,
    });

    return JSON.parse(
      JSON.stringify({
        balance: response.data,
      })
    );
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};
