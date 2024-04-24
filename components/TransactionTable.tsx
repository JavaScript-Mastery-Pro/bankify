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
  const categoryStyles = {
    "Food and Drink": {
      borderColor: "border-pink-600",
      backgroundColor: "bg-pink-500",
      textColor: "text-pink-700",
    },
    Payment: {
      borderColor: "border-success-600",
      backgroundColor: "bg-green-600",
      textColor: "text-success-700",
    },
    "Bank Fees": {
      borderColor: "border-success-600",
      backgroundColor: "bg-green-600",
      textColor: "text-success-700",
    },
    Transfer: {
      borderColor: "border-red-700",
      backgroundColor: "bg-red-700",
      textColor: "text-red-700",
    },
    default: {
      borderColor: "",
      backgroundColor: "bg-blue-500",
      textColor: "text-blue-700",
    },
  };

  const { borderColor, backgroundColor, textColor } =
    categoryStyles[category as keyof typeof categoryStyles] ||
    categoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
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
            <TableCell className="px-0 pr-10">
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
