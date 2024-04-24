"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Client, Account, ID, Databases, Query, Users } from "node-appwrite";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid/config";

import { extractCustomerIdFromUrl, parseStringify } from "../utils";

import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createEmailSession(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account/sessions/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // get cookie
    const responseCookie = response.headers.get("Set-Cookie");

    // set cookie
    cookies().set("appwrite-cookie", responseCookie!);

    const result = await response.json();

    return parseStringify(result);
  } catch (error) {
    console.error("Error", error);
  }
}

// SIGN UP
export const signUp = async ({ name, email, password }: SignUpParams) => {
  try {
    // create appwrite user
    const { user, database } = await createAdminClient();
    const newUserAccount = await user.create(
      ID.unique(),
      email,
      undefined, // optional phone number
      password,
      name
    );

    // create dwolla customer
    const dwollaCustomerUrl = await createDwollaCustomer();
    console.log("======================dwollaCustomer", dwollaCustomerUrl);
    if (!dwollaCustomerUrl) throw Error;
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        name,
        email,
        userId: newUserAccount.$id,
        dwollaCustomerUrl,
        dwollaCustomerId,
      }
    );

    // get userId from session
    await createEmailSession(email, password);

    return parseStringify({ id: newUser.$id, name });
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

// SIGN IN
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await createEmailSession(email, password);
    const user = await getUserInfo(response.userId);

    return parseStringify({
      id: user.$id,
      name: user.name,
    });
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export async function getLoggedInUser() {
  try {
    const appWriteCookie = cookies().get("appwrite-cookie");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Response-Format": "1.4.0",
          "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
          "X-Appwrite-Key": process.env.APPWRITE_SECRET!,
          Cookie: appWriteCookie?.value!,
        },
      }
    );

    const result = await response.json();
    const user = await getUserInfo(result.$id);

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (user: User) => {
  try {
    const tokeParams = {
      user: {
        client_user_id: user.id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokeParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error(
      "An error occurred while creating a new bankify user:",
      error
    );
  }
};

// EXCHANGE PLAID PUBLIC TOKEN
export const exchangePublicToken = async ({
  publicToken,
  user,
  dwollaCustomerId,
}: {
  publicToken: string;
  user: User;
  dwollaCustomerId: string;
}) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // create processor token for dwolla
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // create fundingSourceUrl for the account
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    console.log("======================fundingSourceUrl", fundingSourceUrl);

    // create new user to the user collection
    const { database } = await createAdminClient();
    await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ITEM_COLLECTION_ID!,
      ID.unique(),
      {
        itemId,
        accessToken,
        email: user.email,
        user: user.id,
        accountId: accountData.account_id,
        fundingSourceUrl,
      }
    );

    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
};

// LOGOUT USER
export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-cookie");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}

export async function getUserInfo(userId: string) {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (user.total !== 1) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}
