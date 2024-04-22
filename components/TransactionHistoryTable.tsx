"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";

import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";

const TransactionHistoryTable = ({
  transactions,
}: {
  transactions: Transaction[];
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
      <TransactionTable transactions={currentTransactions} />
      {transactions.length > 10 && (
        <div className="flex w-full justify-center pt-5">
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

export default TransactionHistoryTable;
