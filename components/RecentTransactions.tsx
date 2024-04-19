"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { useUserContext } from "@/context/AuthContext";
import { getTransactions } from "@/lib/services";

import NextPrevButton from "./shared/NextPrevButton";
import TransactionTable from "./TransactionTable";
import { Button } from "./ui/button";

const RecentTransactions = () => {
  const { user } = useUserContext();
  const [transactions, setTransaction] = useState<any[]>([]);

  useEffect(() => {
    const getTransactionsData = async () => {
      const transactions = await getTransactions(user.id);
      if (transactions) {
        const transformedData = transactions.documents.map((document) => ({
          id: document.$id,
          name: document.name,
          companyLogo: "/icons/a-coffee.svg",
          amount: document.amount,
          date: document.$createdAt,
          category: document.category,
          status: "credited",
        }));
        setTransaction(transformedData);
      }

      return transactions;
    };

    getTransactionsData();
  }, [user.id]);
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
      <TransactionTable data={transactions} />
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

export default RecentTransactions;
