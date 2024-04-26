import { redirect } from "next/navigation";

import { BankDropdown } from "@/components/bank/BankDropdown";
import { HeaderBox } from "@/components/common";
import TransactionHistoryTable from "@/components/transaction/TransactionHistoryTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
        <BankDropdown accounts={accounts?.data} />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
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
