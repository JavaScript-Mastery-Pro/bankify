"use client";

import { Pagination } from "../Pagination";

import TransactionTable from "./TransactionTable";

const TransactionHistoryTable = ({
  transactions,
  page,
}: TransactionHistoryTableProps) => {
  const limit = 10;
  const totalPages = Math.ceil(transactions.length / limit);

  const indexOfLastTransaction = page * limit;
  const indexOfFirstTransaction = indexOfLastTransaction - limit;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <section className="flex w-full flex-col gap-6">
      <TransactionTable transactions={currentTransactions} />
      {totalPages > 1 && (
        <div className="my-4 w-full">
          <Pagination totalPages={totalPages} page={page} />
        </div>
      )}
    </section>
  );
};

export default TransactionHistoryTable;
