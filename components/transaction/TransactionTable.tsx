import { transactionCategoryStyles } from "@/constants";
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
} from "../ui/table";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
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
            <TableCell className="px-0 pr-10">
              {transaction.type === "debit"
                ? `-${formatAmount(transaction.amount)}`
                : transaction.type === "credit"
                  ? formatAmount(transaction.amount)
                  : formatAmount(transaction.amount)}
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
