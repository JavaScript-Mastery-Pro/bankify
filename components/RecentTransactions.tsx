"use client";

import Link from "next/link";
import ReactPaginate from "react-paginate";

import { BankCard } from "./BankCard";
import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";

export const RecentTransactions = ({
  transactions,
  hasMore,
  account,
  appwriteItemId,
}: {
  transactions: Transaction[];
  hasMore: boolean;
  account: Account;
  appwriteItemId: string;
}) => {
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-20 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
        </Link>
      </header>
      <BankCard account={account} appwriteItemId={appwriteItemId} type="full" />
      <TransactionTable transactions={transactions} />
      {transactions.length > 5 && (
        <div className="flex-center w-full pt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<NextPrevButton type="next" />}
            pageRangeDisplayed={3}
            pageCount={10}
            previousLabel={<NextPrevButton type="prev" />}
            renderOnZeroPageCount={null}
            className="flex-center w-full gap-3"
            pageClassName="flex-center border text-gray-600 rounded border-sky-1 size-10 text-14 font-semibold"
            nextClassName="flex-center border rounded border-sky-1 size-10 w-fit px-4"
            previousClassName="flex-center border rounded border-sky-1 size-10 w-fit px-4"
          />
        </div>
      )}
    </section>
  );
};
