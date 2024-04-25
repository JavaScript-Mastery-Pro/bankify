"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

interface Transaction {
  name: string;
  amount: string;
  channel: string;
  category: string;
  senderId: string;
  receiverId: string;
  receiverBankId: string;
  senderBankId: string;
}

export const createTransaction = async (transaction: Transaction) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      transaction
    );

    return parseStringify(newTransaction);
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

export const getTransactionsByBankId = async (
  userId: string,
  bankId: string
) => {
  try {
    const { database } = await createAdminClient();

    const transactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId), Query.equal("senderId", userId)]
    );

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};
