"use server";

import { ID } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../appwrite.config";

interface Transaction {
  name: string;
  amount: string;
  date: string;
  channel: string;
  category: string;
  sender: string;
  receiver: string;
  receiverBankId: string;
  senderBankId: string;
}

export const createTransaction = async (transaction: Transaction) => {
  try {
    const { database } = await createAdminClient();

    const result = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      transaction
    );

    return parseStringify(result);
  } catch (error) {
    console.error("An error occurred while creating the transaction:", error);
  }
};

export const getTransactions = async (bankId: string) => {
  try {
    const { database } = await createAdminClient();

    const transactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};

export const getTransactionsByUserId = async (
  userId: string,
  bankId: string
) => {
  try {
    const { database } = await createAdminClient();

    const transactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId), Query.equal("sender", userId)]
    );

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};
