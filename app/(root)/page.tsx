import Image from "next/image";

import BudgetCard from "@/components/BudgetCard";
import CreditCard from "@/components/CreditCard";
import DoughnutChart from "@/components/DoughnutChart";
import RecentTransactions from "@/components/RecentTransactions";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { budgetCards } from "@/constants";
// import { getBalance } from "@/lib/stripe/balance.stripe";

// import { getCurrentUserServer } from "@/lib/services/user.services";

const Home = async () => {
  // const balance = await getBalance("acct_1P4yTKCE6Xl11oKt");
  // const balances = [
  //   {
  //     type: "available",
  //     amount: balance.available[0].amount,
  //   },
  //   {
  //     type: "instant",
  //     amount: balance.instant_available[0].amount,
  //   },
  //   {
  //     type: "pending",
  //     amount: balance.pending[0].amount,
  //   },
  // ];

  // const totalBalance =
  //   balances.reduce((total, currentValue) => total + currentValue.amount, 0) /
  //   100;
  const totalBalance = 33.91;

  return (
    <section className="no-scrollbar flex w-full flex-col max-xl:max-h-screen max-xl:overflow-y-scroll xl:flex-row">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <DashboardHeader />
        <section className="flex h-[168px] w-full items-center gap-6 rounded-xl border border-gray-200 p-6 shadow-chart">
          <div className="size-full max-w-[120px]">
            <DoughnutChart />
          </div>
          <article className="flex w-full flex-1 flex-col gap-6">
            <h1 className="text-16 font-semibold text-gray-900">
              Primary account
            </h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-14 font-medium text-gray-600">
                Current balance
              </h1>
              <div className="flex w-full items-center justify-between">
                <h1 className="text-24 lg:text-30 flex-1 font-semibold text-gray-900">
                  ${totalBalance}
                </h1>
                <div className="text-14  flex h-fit items-center rounded-2xl bg-success-50 px-2 font-medium text-success-700 max-sm:hidden">
                  <Image
                    src="/icons/arrow-up.svg"
                    width={12}
                    height={12}
                    alt="arrow up"
                  />{" "}
                  <h3>3.4</h3>
                </div>
              </div>
            </div>
          </article>
        </section>
        <RecentTransactions />
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
              <CreditCard icon="/icons/visa.svg" />
              <div className="absolute left-7 top-10 -z-10 w-full md:left-48 xl:left-7">
                <CreditCard
                  bgClassName="bg-bank-gradient"
                  icon="icons/mastercard.svg"
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
