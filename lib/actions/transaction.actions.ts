"use server";

import { ID, Query } from "node-appwrite";

import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";

interface Transaction {
  name: string;
  amount: string;
  date: string;
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

export const getTransactionsByBankId = async (bankId: string) => {
  try {
    const { database } = await createAdminClient();

    const transactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [
        Query.equal("senderBankId", bankId),
        Query.equal("receiverBankId", bankId),
      ]
    );

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};
