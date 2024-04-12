import Image from "next/image";

import RecentTransactions from "@/components/RecentTransactions";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <section className="flex w-full flex-col xl:flex-row">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-8 py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex justify-between">
          <div className="flex flex-col gap-1 ">
            <h1 className="text-30 font-semibold text-gray-900">
              Welcome, <span className="text-bankGradient">Adrian</span>
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Access & manage your account and transactions efficiently.
            </p>
          </div>
          <div>
            <Button className="text-14 bg-bank-gradient px-4 py-2.5 font-semibold text-white shadow-form">
              Send funds
            </Button>
          </div>
        </header>
        <section className="min-h-[168px] w-full rounded-xl border border-gray-200 p-6 shadow-chart">
          chart
        </section>
        <RecentTransactions />
      </div>
      <aside className="flex w-full flex-col border-l border-gray-200 xl:w-[390px]">
        <section className="flex flex-col">
          <div
            style={{
              backgroundImage: "url('/icons/gradient-mesh.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "120px",
            }}
          />
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
      </aside>
    </section>
  );
};

export default Home;
