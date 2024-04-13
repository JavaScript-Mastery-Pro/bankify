import React from "react";

import ConnectAccountForm from "@/components/ConnectAccountForm";

const ConnectBankAccount = () => {
  return (
    <section className="no-scrollbar flex flex-col gap-8 overflow-y-scroll p-8 md:max-h-screen xl:py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-30 font-semibold text-gray-900">
          Connect a Bank Account
        </h1>
        <p className="text-16 font-normal text-gray-600">
          Securely link your bank account
        </p>
      </header>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1 border-y border-gray-200 py-6">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>
        <section className="size-full">
          <ConnectAccountForm />
        </section>
      </div>
    </section>
  );
};

export default ConnectBankAccount;
