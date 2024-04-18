import Image from "next/image";

import DepositModal from "@/components/DepositModal";
import TransactionHistoryTable from "@/components/TransactionHistoryTable";
import { Button } from "@/components/ui/button";

const TransactionHistory = () => {
  return (
    <section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <header className="flex w-full justify-between max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-30 font-semibold text-gray-900">
            Transaction History
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Welcome back, Adrian
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DepositModal />
          <Button className="text14_padding10 bg-bank-gradient text-white shadow-form">
            Send fund
          </Button>
        </div>
      </header>
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-between">
          <h1 className="text-18 font-semibold text-gray-900">
            Transaction history
          </h1>
          <Button
            variant="outline"
            className="text14_padding10 border-gray-300 text-gray-700 shadow-form"
          >
            <Image
              src="/icons/filter-lines.svg"
              width={20}
              height={20}
              alt="dollar icon"
            />
            &nbsp; Apply
          </Button>
        </div>
        <TransactionHistoryTable />
      </div>
    </section>
  );
};

export default TransactionHistory;
