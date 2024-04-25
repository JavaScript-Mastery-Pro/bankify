"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid/config";
import { parseStringify, extractCustomerIdFromUrl } from "@/lib/utils";

import { createAdminClient, createSessionClient } from "../appwrite.config";

import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

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
export const signUp = async ({ password, ...userData }: SignUpParams) => {
  try {
    // create appwrite user
    const { user, database } = await createAdminClient();
    const newUserAccount = await user.create(
      ID.unique(),
      userData.email,
      undefined, // optional phone number
      password
    );

    // create dwolla customer
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    console.log("======================dwollaCustomer", dwollaCustomerUrl);

    if (!dwollaCustomerUrl) throw Error;
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerUrl,
        dwollaCustomerId,
      }
    );

    // get userId from session
    await createEmailSession(userData.email, password);

    return parseStringify(newUser);
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

    return parseStringify(user);
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
  console.log("===================link token user", user);
  try {
    const tokeParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.firstName + user.lastName,
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
}: {
  publicToken: string;
  user: User;
}) => {
  console.log("==============exchangeUser", user);
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

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
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    console.log("==============fundingSourceUrl", fundingSourceUrl);

    if (!fundingSourceUrl) throw Error;

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
    });

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

export async function createBankAccount({
  accessToken,
  userId,
  accountId,
  bankId,
  fundingSourceUrl,
}: {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
}) {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      {
        accessToken,
        userId,
        accountId,
        bankId,
        fundingSourceUrl,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

// get user bank accounts
export async function getBanks(userId: string) {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

// get specific bank from bank collection by document id
export async function getBank(documentId: string) {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}
