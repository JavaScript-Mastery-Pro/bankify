"use client";

import Link from "next/link";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import { Bank } from "./Bank";
import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";

export const RecentTransactions = ({
  transactions,
  account,
  appwriteItemId,
}: {
  transactions: Transaction[];
  account: Account;
  appwriteItemId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 10;
  const pageCount = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const indexOfLastTransaction = (currentPage + 1) * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-20 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Link
          href={`/transactions/?id=${appwriteItemId}`}
          className="text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
        </Link>
      </header>
      <Bank account={account} appwriteItemId={appwriteItemId} type="full" />
      <TransactionTable transactions={currentTransactions} />
      {transactions.length > 10 && (
        <div className="flex-center w-full pt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<NextPrevButton type="next" />}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            previousLabel={<NextPrevButton type="prev" />}
            containerClassName="flex flex-row gap-2 items-center"
            pageClassName="cursor-pointer mx-1 py-1 px-3 rounded hover:bg-gray-200 transition-all"
            activeClassName="bg-blue-500 text-white hover:text-gray-500 transition-all" //
            previousLinkClassName="px-3 py-1 rounded "
            nextLinkClassName="px-3 py-1 rounded"
          />
        </div>
      )}
    </section>
  );
};
