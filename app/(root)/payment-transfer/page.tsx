import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import { PageHeader } from "@/components/common";
import PaymentTransferForm from "@/components/PaymentTransferForm";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts(loggedIn?.$id);
  if (!accounts) return;

  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <PageHeader
        topTitle="Payment Transfer"
        bottomTitle="Transfer details"
        topDescription="Please provide any specific details or notes related to the payment transfer"
        bottomDescription="Enter your transfer details"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
};

export default page;
