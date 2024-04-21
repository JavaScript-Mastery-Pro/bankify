"use server";

import { revalidatePath } from "next/cache";

import { ITEMS } from "@/constants";

import { plaidClient } from "../plaid/config";
import { parseStringify } from "../utils";

// GET ACCOUNTS FROM PLAID
// 1. Get user's accessToken from DB
// 2. Create link token and exhange token
// 3. Get accounts & format
export const getAccounts = async (appwriteItemId: string) => {
  try {
    // 1. Get user's accessToken from DB
    // Todo
    const accessToken = ITEMS.filter((bank) => bank.id === appwriteItemId)[0]
      .accessToken;

    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    // Format data
    const accounts = response.data.accounts.map((item) => ({
      id: item.account_id,
      availableBalance: item.balances.available!,
      currentBalance: item.balances.current!,
      name: item.name,
      officialName: item.official_name!,
      mask: item.mask!,
      type: item.type as string,
      subtype: item.subtype! as string,
    }));

    console.log({ accounts });

    return parseStringify({ accounts });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// GET TRANSACTIONS FROM PLAID
// 1. Get user's accessToken from DB
// 2. Create link token and exhange token
// 3. Get trasnactions & format
export const getTransactions = async (appwriteItemId: string) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // 1. Get user's accessToken from DB
    const accessToken = ITEMS.filter((bank) => bank.id === appwriteItemId)[0]
      .accessToken;
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      console.log(data);
      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    // Format data
    const transactionsData = { transactions, hasMore };
    revalidatePath("/");

    return parseStringify(transactionsData);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
