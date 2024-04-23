import {
  cn,
  formatAmount,
  formatDateTime,
  removeSpecialCharacters,
} from "@/lib/utils";

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
        "flex-center truncate w-fit gap-1 rounded-2xl border-[1.5px] border-blue-600 py-[2px] pl-1.5 pr-2",
        {
          "border-pink-600": category === "Food and Drink",
          "border-success-600": ["Payment", "Bank Fees"].includes(category),
          "border-red-700": category === "Transfer",
        }
      )}
    >
      <div
        className={cn("size-2 rounded-full bg-blue-500", {
          "bg-pink-500": category === "Food and Drink",
          "bg-green-600": ["Payment", "Bank Fees"].includes(category),
          "bg-red-700": category === "Transfer",
        })}
      />
      <p
        className={cn("text-[12px] font-medium text-blue-700", {
          "text-pink-700": category === "Food and Drink",
          "text-success-700": ["Payment", "Bank Fees"].includes(category),
          "text-red-700": category === "Transfer",
        })}
      >
        {category}
      </p>
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
          <TableHead className="px-0 max-md:hidden">Channel</TableHead>
          <TableHead className="px-0 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="max-w-[250px] pl-0 pr-10">
              <div className="flex items-center gap-3">
                <h1 className="text-14 truncate font-medium text-gray-900">
                  {removeSpecialCharacters(transaction.name)}
                </h1>
              </div>
            </TableCell>
            <TableCell className="px-0  pr-10">
              {formatAmount(transaction.amount)}
            </TableCell>
            <TableCell className="min-w-32 px-0 pr-10">
              {formatDateTime(new Date(transaction.date)).dateTime}
            </TableCell>
            <TableCell className="min-w-24 px-0 pr-10 capitalize">
              {transaction.paymentChannel}
            </TableCell>
            <TableCell className="px-0 max-md:hidden">
              <CategoryBadge category={transaction.category} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
