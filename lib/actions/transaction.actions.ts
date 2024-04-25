"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

interface CreateTransactionProps {
  amount: string;
  senderId: string;
  date: string;
  channel: string;
  category: string;
  receiverId: string;
  receiverBankId: string;
  senderBankId: string;
  sharableId: string;
}

export const createTransaction = async ({
  sharableId,
  ...transaction
}: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        transaction,
      }
    );

    return parseStringify(newTransaction);
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
