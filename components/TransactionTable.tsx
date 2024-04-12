import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TransactionTableProps {
  data: {
    company: string;
    companyLogo: string;
    amount: number;
    date: string;
    category: string;
    status: string;
  }[];
}

const CategoryBadge = ({ category }: { category: string }) => {
  return (
    <div
      className={cn(
        "flex-center w-fit gap-1 rounded-2xl border-[1.5px] border-blue-600 py-[2px] pl-1.5 pr-2",
        {
          "border-pink-600": category === "Food and dining",
          "border-success-600": category === "Income",
          "border-indigo-500": category === "Groceries",
        }
      )}
    >
      <div
        className={cn("size-2 rounded-full bg-blue-500", {
          "bg-pink-500": category === "Food and dining",
          "bg-green-600": category === "Income",
          "bg-indigo-500": category === "Groceries",
        })}
      />
      <h2
        className={cn("text-12 font-medium text-blue-700", {
          "text-pink-700": category === "Food and dining",
          "text-success-700": category === "Income",
          "text-indigo-700": category === "Groceries",
        })}
      >
        {category}
      </h2>
    </div>
  );
};

const TransactionTable = ({ data }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-0">Transaction</TableHead>
          <TableHead className="px-0">Amount</TableHead>
          <TableHead className="px-0">Date</TableHead>
          <TableHead className="px-0 max-md:hidden">Category</TableHead>
          <TableHead className="px-0 max-md:hidden"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((transaction, index) => (
          <TableRow key={index + 1}>
            <TableCell className="truncate px-0">
              <div className="flex items-center gap-3">
                <Image
                  src={transaction.companyLogo}
                  width={40}
                  height={40}
                  alt="company logo"
                />
                <h1 className="text-14 font-medium text-gray-900">
                  {transaction.company}
                </h1>
              </div>
            </TableCell>
            <TableCell className="px-0">
              {transaction.status === "debited" ? "-" : "+"}$
              {transaction.amount}
            </TableCell>
            <TableCell className="px-0">{transaction.date}</TableCell>
            <TableCell className="px-0 max-md:hidden">
              <CategoryBadge category={transaction.category} />
            </TableCell>
            <TableCell className="max-md:hidden">
              <div className="flex justify-end">
                <Image
                  src="/icons/edit.svg"
                  width={20}
                  height={20}
                  alt="edit"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
