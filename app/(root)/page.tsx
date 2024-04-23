import { redirect } from "next/navigation";

import { RecentTransactions } from "@/components/RecentTransactions";
import { HeaderBox } from "@/components/shared/HeaderBox";
import { RightSidebar } from "@/components/shared/RightSidebar";
import { TotalBalanceBox } from "@/components/shared/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  const accounts = await getAccounts();
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

  const account = await getAccount(appwriteItemId);

  // const data = {
  //   appwriteItemId,
  //   senderAccountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  //   receiverAccountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  //   amount: "5.00",
  //   description: "Transfer note",
  //   name: "John Doe",
  //   userId: TEST_USER_ID,
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
            user={loggedIn?.name || "Guest"}
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

      <RightSidebar
        name={loggedIn?.name}
        email={loggedIn?.email}
        transactions={account?.transactions}
      />
    </section>
  );
};

export default Home;
