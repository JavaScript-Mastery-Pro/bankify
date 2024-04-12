import Image from "next/image";

import { Button } from "@/components/ui/button";

const TransactionHistory = () => {
  return (
    <section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll px-8 py-12">
      <header className="flex w-full justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-30 font-semibold text-gray-900">
            Transaction History
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Welcome back, Adrian
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text14_padding10 border-gray-300 text-gray-700 shadow-form"
          >
            <Image
              src="/icons/dollar.svg"
              width={20}
              height={20}
              alt="dollar icon"
            />
            &nbsp; Deposit
          </Button>
          <Button className="text14_padding10 bg-bank-gradient text-white shadow-form">
            Send fund
          </Button>
        </div>
      </header>
    </section>
  );
};

export default TransactionHistory;
