"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...transaction,
      }
    );

    return parseStringify(newTransaction);
  } catch (error) {
    console.error("An error occurred while creating the transaction:", error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );

    const receiverTransactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)]
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents,
        ...receiverTransactions.documents,
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
  }
};
