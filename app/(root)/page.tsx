import Image from "next/image";
import { redirect } from "next/navigation";

import { budgetCards } from "@/constants";
import AccountHeader from "@/components/AccountHeader";
import BudgetCard from "@/components/BudgetCard";
import CreditCard from "@/components/CreditCard";
import DoughnutChart from "@/components/DoughnutChart";
import RecentTransactions from "@/components/RecentTransactions";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getAccounts, getTransactions } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  console.log(user);

  const { accounts } = await getAccounts();
  const { transactions, hasMore } = await getTransactions();

  return (
    <section className="no-scrollbar flex w-full flex-col max-xl:max-h-screen max-xl:overflow-y-scroll xl:flex-row">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <DashboardHeader />
        <section className="flex h-[168px] w-full items-center gap-6 rounded-xl border border-gray-200 p-6 shadow-chart">
          <div className="size-full max-w-[120px]">
            <DoughnutChart />
          </div>
          <AccountHeader account={accounts[0]} />
        </section>
        <RecentTransactions transactions={transactions} hasMore={hasMore} />
      </div>
      <aside className="no-scrollbar flex w-full flex-col border-l border-gray-200 xl:max-h-screen xl:w-[390px] xl:overflow-y-scroll">
        <section className="flex flex-col">
          <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat" />
          <div className="relative flex px-6 max-xl:justify-center">
            <div className="flex-center absolute -top-8 size-24 rounded-full bg-white shadow-profile">
              <Image src="/icons/jsm.svg" width={80} height={80} alt="jsm" />
            </div>
            <div className="flex flex-col pt-28">
              <h1 className="text-24 font-semibold text-gray-900">
                Adrain Hajdin
              </h1>
              <p className="text-16 font-normal text-gray-600">
                adrian@jsmastery.pro
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-between gap-8 px-6 py-8">
          <div className="flex flex-1 flex-col gap-6">
            <header className="flex w-full justify-between">
              <h1 className="text-18 font-semibold text-gray-900">My Banks</h1>
              <div className="flex gap-2">
                <Image
                  src="/icons/plus.svg"
                  width={20}
                  height={20}
                  alt="plus icon"
                />
                <h2 className="text-14 font-semibold text-gray-600">
                  Add Bank
                </h2>
              </div>
            </header>
            <div className="max-xl:flex-center relative">
              <CreditCard
                icon="/icons/visa.svg"
                cardNumber="1234 1234 1234 1234"
                bankName="JS Mastery."
                expiryDate="12/24"
                cardOwner="Adrian Hajdin"
              />
              <div className="absolute left-7 top-10 -z-10 w-full md:left-48 xl:left-7">
                <CreditCard
                  bgClassName="bg-bank-gradient"
                  icon="icons/mastercard.svg"
                  cardNumber="1234 1234 1234 1234"
                  bankName="JS Mastery."
                  expiryDate="12/24"
                  cardOwner="Adrian Hajdin"
                />
              </div>
            </div>
          </div>
          <section className="flex flex-1 flex-col gap-6 pt-10">
            <h1 className="text-18 font-semibold text-gray-900">My budgets</h1>
            <div className="flex flex-col gap-3">
              {budgetCards.map((budgetCard) => (
                <BudgetCard
                  key={budgetCard.type}
                  type={budgetCard.type}
                  amountLeft={budgetCard.amountLeft}
                />
              ))}
            </div>
          </section>
        </section>
      </aside>
    </section>
  );
};

export default Home;
