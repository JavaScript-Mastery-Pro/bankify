"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "../appwrite.config";
import { decryptId, parseStringify } from "../utils";

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

    const accountId = decryptId(sharableId);

    const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );
    if (bank.total !== 1) return null;

    const receiverBank = bank.documents[0];

    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        name: "Transfer Transaction",
        channel: "online",
        category: "Transfer",
        receiverId: receiverBank.userId,
        receiverBankId: receiverBank.$id,
        ...transaction,
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
