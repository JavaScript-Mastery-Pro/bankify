import { BankCard } from "@/components/BankCard";
import { SelectBank } from "@/components/shared/SelectBank";
import TransactionHistoryTable from "@/components/TransactionHistoryTable";
import { getAccounts, getTransactions } from "@/lib/actions/bank.actions";

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
  const { accounts } = await getAccounts();
  const appwriteItemId =
    (searchParams?.id as string) || accounts[0].appwriteItemId;
  const account = accounts.find(
    (account: Account) => account.appwriteItemId === appwriteItemId
  );
  const { transactions } = await getTransactions(appwriteItemId);

  return (
    <section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <header className="flex w-full items-start justify-between max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-30 font-semibold text-gray-900">
            Transaction History
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Below is the list of {account.name}&apos;s recent transaction
            records.
          </p>
        </div>
        <SelectBank appwriteItemId={appwriteItemId} accounts={accounts} />
      </header>
      <div className="flex flex-col gap-6">
        <BankCard
          account={account}
          appwriteItemId={appwriteItemId}
          type="full"
        />
        <TransactionHistoryTable transactions={transactions} />
      </div>
    </section>
  );
};

export default TransactionHistory;
