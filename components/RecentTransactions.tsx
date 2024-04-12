"use client";

import ReactPaginate from "react-paginate";

import { transactionHistory } from "@/constants";

import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";
import { Button } from "./ui/button";

const RecentTransactions = () => {
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex justify-between">
        <h2 className="text-18 font-semibold text-gray-900">
          Recent transactions
        </h2>
        <Button
          variant="outline"
          className="text-14 rounded-lg border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
        </Button>
      </header>
      <TransactionTable data={transactionHistory} />
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
    </section>
  );
};

export default RecentTransactions;
