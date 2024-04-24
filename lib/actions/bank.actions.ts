"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { ITEMS } from "@/constants";

import { plaidClient } from "../plaid/config";
import { parseStringify } from "../utils";

// Get multiple bank accounts
export const getAccounts = async () => {
  try {
    // get banks from db
    const banks = ITEMS;

    const accounts = await Promise.all(
      banks.map(async (bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution(
          accountsResponse.data.item.institution_id!
        );

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
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

// Get one bank account
export const getAccount = async (appwriteItemId: string) => {
  try {
    // get bank from db
    const bank = ITEMS.find((account) => account.id === appwriteItemId)!;

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // console.log("=================== accountData", accountData);

    // get institution info from plaid
    const institution = await getInstitution(
      accountsResponse.data.item.institution_id!
    );

    // console.log("=================== institution", institution);

    const transactions = await getTransactions(appwriteItemId);

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.id,
    };

    return parseStringify({ data: account, transactions });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
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

// Get transactions
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

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

export const transferFund = async ({
  amount,
  description,
  name,
  userId,
  senderAccountId,
  receiverAccountId,
  appwriteItemId,
}: {
  appwriteItemId: string;
  amount: string;
  description: string;
  senderAccountId: string;
  receiverAccountId: string;
  name: string;
  userId: string;
}) => {
  try {
    // const transferIntentCreateRequest = {
    //   mode: "PAYMENT" as TransferIntentCreateMode,
    //   amount,
    //   ach_class: "ppd" as ACHClass,
    //   description,
    //   funding_account_id: senderAccountId,
    //   account_id: receiverAccountId,
    //   user: {
    //     legal_name: name,
    //   },
    // };

    // const transferIntentCreateResponse = await plaidClient.transferIntentCreate(
    //   transferIntentCreateRequest
    // );

    // // save to DB to get the status of transfer
    // const transferIntentId = transferIntentCreateResponse.data.transfer_intent;

    // console.log("==========transferIntentId", transferIntentId);

    // const linkTokenParams = {
    //   user: {
    //     client_user_id: userId,
    //   },
    //   client_name: name,
    //   country_codes: ["US"] as CountryCode[],
    //   language: "en",
    //   products: ["transfer"] as Products[],
    //   transfer: {
    //     intent_id: transferIntentId as any,
    //   },
    //   link_customization_name: "horizon" as any,
    // };
    // const linkTokenResponse =
    //   await plaidClient.linkTokenCreate(linkTokenParams);

    // console.log("==========linkTokenResponse.data", linkTokenResponse.data);

    const accessToken = "";

    const transferAuthorizatioRequest: TransferAuthorizationCreateRequest = {
      access_token: accessToken,
      account_id: receiverAccountId,
      type: "debit" as TransferType,
      network: "ach" as TransferNetwork,
      amount,
      ach_class: "ppd" as ACHClass,
      funding_account_id: senderAccountId,
      user: {
        legal_name: "Anne Charleston",
      },
    };

    const transferAuthorizatioResponse =
      await plaidClient.transferAuthorizationCreate(
        transferAuthorizatioRequest
      );
    console.log(
      "================transferAuthorizatioResponse",
      transferAuthorizatioResponse
    );
    const authorizationId = transferAuthorizatioResponse.data.authorization.id;

    const transferRequest: TransferCreateRequest = {
      access_token: accessToken,
      account_id: receiverAccountId,
      description: "transfer",
      origination_account_id: "",
      authorization_id: authorizationId,
      amount,
    };

    const transferResponse = await plaidClient.transferCreate(transferRequest);
    const transfer = transferResponse.data.transfer;

    return parseStringify({ transfer });
  } catch (error) {
    console.error(
      "========================An error occurred while initiating transfer:",
      error
    );
  }
};
