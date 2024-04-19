"use client";

import ReactPaginate from "react-paginate";

import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";

const TransactionHistoryTable = () => {
  // Form transaction table data
  // const getTransactionsData = async () => {
  //   const transactions = await getTransactions(user.id);
  //   if (transactions) {
  //     const transformedData = transactions.documents.map((document) => ({
  //       id: document.$id,
  //       name: document.name,
  //       companyLogo: "/icons/a-coffee.svg",
  //       amount: document.amount,
  //       date: document.$createdAt,
  //       category: document.category,
  //       status: "credited",
  //     }));
  //     setTransaction(transformedData);
  //   }
  //   return transactions;
  // };
  // getTransactionsData();

  return (
    <section className="flex w-full flex-col gap-6">
      <TransactionTable data={[]} />
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

export default TransactionHistoryTable;
