import React from "react";

import ConnectAccountForm from "@/components/ConnectAccountForm";
import PageHeader from "@/components/shared/PageHeader";

const ConnectBankAccount = () => {
  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll p-8 md:max-h-screen xl:py-12">
      <PageHeader
        topTitle="Connect a Bank Account"
        bottomTitle="Bank account details"
        topDescription="Securely link your bank account"
        bottomDescription="Enter the bank account details of the recipient"
      />
      <section className="size-full">
        <ConnectAccountForm />
      </section>
      <section></section>
    </section>
  );
};

export default ConnectBankAccount;
