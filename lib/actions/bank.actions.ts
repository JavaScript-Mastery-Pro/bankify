"use server";

import { revalidatePath } from "next/cache";
import { CountryCode } from "plaid";

import { ITEMS } from "@/constants";

import { plaidClient } from "../plaid/config";
import { parseStringify } from "../utils";

export const getAccounts = async () => {
  try {
    // Todo replace ITEMS with the list of items from DB
    const accounts = await Promise.all(
      ITEMS.map(async (bank) => {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        const institution = await getInstitution(
          accountsResponse.data.item.institution_id!
        );

        // Format data
        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          institutionName: institution.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.id,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

export const getAccount = async (appwriteItemId: string) => {
  try {
    // Todo replace ITEMS with the list of items from DB

    const bank = ITEMS.find((account) => account.id === appwriteItemId)!;
    const response = await plaidClient.accountsGet({
      access_token: bank?.accessToken,
    });
    const data = response.data.accounts[0];

    // Format data
    const account = {
      id: data.account_id,
      availableBalance: data.balances.available!,
      currentBalance: data.balances.current!,
      name: data.name,
      officialName: data.official_name!,
      mask: data.mask!,
      institutionId: response.data.item.institution_id,
      type: data.type as string,
      subtype: data.subtype! as string,
      appwriteItemId: bank.id,
    };

    return parseStringify({ account });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

export const getInstitution = async (institutionId: string) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
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

    revalidatePath("/");

    return parseStringify({ data: transactions });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
