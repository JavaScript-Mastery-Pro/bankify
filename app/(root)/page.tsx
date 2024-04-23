import { RecentTransactions } from "@/components/RecentTransactions";
import { HeaderBox } from "@/components/shared/HeaderBox";
import { RightSidebar } from "@/components/shared/RightSidebar";
import { TotalBalanceBox } from "@/components/shared/TotalBalanceBox";
import {
  getAccount,
  getAccounts,
  // transferFund,
} from "@/lib/actions/bank.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const accounts = await getAccounts();
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

  const account = await getAccount(appwriteItemId);

  // const data = {
  //   appwriteItemId,
  //   senderAccountId: "1ZWwERd3NZfxjzgxA783CQGjpor7A4ipVx4Gq",
  //   receiverAccountId: "6z63RDWx3WTANod5ZKLmCnM6vGNanzCn4VX1b",
  //   amount: "5.00",
  //   description: "Transfer note",
  //   name: "John Doe",
  //   userId: "6624bf1e0022238a30a6",
  // };
  // const transferData = await transferFund(data);

  // console.log(transferData);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome,"
            user="Adrian"
            subtext="Access & manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar transactions={account?.transactions} />
    </section>
  );
};

export default Home;
