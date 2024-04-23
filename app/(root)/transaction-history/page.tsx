import { BankDropdown } from "@/components/shared/BankDropdown";
import { HeaderBox } from "@/components/shared/HeaderBox";
import TransactionHistoryTable from "@/components/TransactionHistoryTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { formatAmount } from "@/lib/utils";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const accounts = await getAccounts();
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

  const account = await getAccount(appwriteItemId);

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="Your bank details and transactions."
        />
        <BankDropdown
          accounts={accounts?.data}
          appwriteItemId={appwriteItemId}
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.institutionName}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className={`text-14 font-medium text-blue-25`}>
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className={`text-14`}>Current Balance</p>
            <p className={`text-24 text-center font-bold `}>
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <TransactionHistoryTable
          page={currentPage}
          transactions={account?.transactions}
        />
      </div>
    </section>
  );
};

export default TransactionHistory;
