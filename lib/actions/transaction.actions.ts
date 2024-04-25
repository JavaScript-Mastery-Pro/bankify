"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

interface CreateTransactionProps {
  amount: string;
  senderId: string;
  senderBankId: string;
  sharableId: string;
}

export const createTransaction = async ({
  sharableId,
  ...transaction
}: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();
    const bank = {
      userId: "662a47fa074fb89e70f7",
      $id: "662a4aa86eae084844d7",
    };
    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        name: " Transfer",
        channel: "online",
        category: "Transfer",
        receiverId: bank.userId,
        receiverBankId: bank.$id,
        ...transaction,
      }
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
