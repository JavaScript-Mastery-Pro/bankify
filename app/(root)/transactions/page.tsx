import { SelectBank } from "@/components/shared/SelectBank";
import TransactionHistoryTable from "@/components/TransactionHistoryTable";
import { getAccounts, getTransactions } from "@/lib/actions/bank.actions";
import { formatAmount, getAccountTypeColors } from "@/lib/utils";

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
  const accounts = await getAccounts();
  const appwriteItemId =
    (searchParams?.id as string) ||
    (accounts && accounts?.data[0].appwriteItemId);

  const account =
    accounts &&
    accounts?.data.find(
      (account: Account) => account.appwriteItemId === appwriteItemId
    );

  const transactions = await getTransactions(appwriteItemId);

  const colors = getAccountTypeColors(account?.type);

  return (
    <section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <header className="flex w-full items-start justify-between max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-30 font-semibold text-gray-900">
            Bank Transactions
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Your bank details and transactions
          </p>
        </div>
        <SelectBank appwriteItemId={appwriteItemId} accounts={accounts?.data} />
      </header>
      <div className="space-y-6">
        <div
          className={`flex justify-between bg-blue-25 ${colors?.bg} border-y px-4 py-5`}
        >
          <div className="flex flex-col gap-2">
            <h2 className={`text-18 font-bold text-blue-900 ${colors?.title}`}>
              {account.institutionName}
            </h2>
            <p className={`text-14 text-blue-700 ${colors?.subText}`}>
              {account.officialName}
            </p>
            <p
              className={`text-14 font-medium text-blue-700 ${colors?.subText}`}
            >
              ●●●● ●●●● ●●●● {account.mask}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-blue-700">
            <p className={`text-14 ${colors?.subText}`}>Current Balance</p>
            <p className={`text-18 text-right font-bold ${colors?.subText}`}>
              {formatAmount(account.currentBalance)}
            </p>
            <p
              className={`text-12 w-fit rounded-full bg-blue-100 ${colors?.lightBg} px-3 py-1 ${colors?.subText}`}
            >
              {account.type}
            </p>
          </div>
        </div>
        <TransactionHistoryTable transactions={transactions?.data} />
      </div>
    </section>
  );
};

export default TransactionHistory;
