import { cn, formatDateTime, removeSpecialCharacters } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CategoryBadge = ({ category }: { category: string }) => {
  return (
    <div
      className={cn(
        "flex-center w-fit gap-1 rounded-2xl border-[1.5px] border-blue-600 py-[2px] pl-1.5 pr-2",
        {
          "border-pink-600": category === "Food and dining",
          "border-success-600": category === "Payment",
          "border-indigo-500": category === "Transfer",
        }
      )}
    >
      <div
        className={cn("size-2 rounded-full bg-blue-500", {
          "bg-pink-500": category === "Food and dining",
          "bg-green-600": category === "Payment",
          "bg-indigo-500": category === "Transfer",
        })}
      />
      <h2
        className={cn("text-12 font-medium text-blue-700", {
          "text-pink-700": category === "Food and dining",
          "text-success-700": category === "Payment",
          "text-indigo-700": category === "Transfer",
        })}
      >
        {category}
      </h2>
    </div>
  );
};

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-0">Transaction</TableHead>
          <TableHead className="px-0">Amount</TableHead>
          <TableHead className="px-0">Date</TableHead>
          <TableHead className="px-0 max-md:hidden">Category</TableHead>
          <TableHead className="px-0 max-md:hidden">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="truncate px-0">
              <div className="flex items-center gap-3">
                {/* <Image
                  src={transaction.companyLogo}
                  width={40}
                  height={40}
                  alt="company logo"
                /> */}
                <h1 className="text-14 font-medium text-gray-900">
                  {removeSpecialCharacters(transaction.name)}
                </h1>
              </div>
            </TableCell>
            <TableCell className="px-0">
              {transaction.amount < 0 ? "-" : "+"}${transaction.amount}
            </TableCell>
            <TableCell className="px-0">
              {formatDateTime(new Date(transaction.date)).dateTime}
            </TableCell>
            <TableCell className="px-0">{transaction.type}</TableCell>
            <TableCell className="px-0 max-md:hidden">
              <CategoryBadge category={transaction.category[0]} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
