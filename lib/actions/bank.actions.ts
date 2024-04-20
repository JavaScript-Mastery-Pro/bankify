"use server";

import { plaidClient } from "../plaid/config";
import { parseStringify } from "../utils";

// GET ACCOUNTS FROM PLAID
// 1. Get user's accessToken from DB
// 2. Create link token and exhange token
// 3. Get accounts & format
export const getAccounts = async () => {
  try {
    // 1. Get user's accessToken from DB
    const accessToken = "access-sandbox-3f2c1164-08a1-413c-8322-255cd546d04a";

    // 2. Create link token and exhange token
    // ----

    // 3. Get accounts
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    // Format data
    const accounts = response.data.accounts.map((account) => ({
      id: account.account_id,
      availableBalance: account.balances.available,
      currentBalance: account.balances.current,
      name: account.name,
      officialName: account.official_name,
      mask: account.mask,
      type: account.type,
      subtype: account.subtype,
    }));

    return parseStringify({ accounts });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// GET TRANSACTIONS FROM PLAID
// 1. Get user's accessToken from DB
// 2. Create link token and exhange token
// 3. Get trasnactions & format
export const getTransactions = async () => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // 1. Get user's accessToken from DB
    const accessToken = "access-sandbox-3f2c1164-08a1-413c-8322-255cd546d04a";
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;
      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.transaction_type,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category,
        date: transaction.date,
      }));

      hasMore = data.has_more;
    }

    // Format data
    const transactionsData = { transactions, hasMore };

    return parseStringify(transactionsData);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
