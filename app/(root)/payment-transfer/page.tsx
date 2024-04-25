import PaymentTransferForm from "@/components/PaymentTransferForm";
import PageHeader from "@/components/shared/PageHeader";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts(loggedIn?.$id);
  if (!accounts) return;

  const accountsData = accounts?.data;

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <PageHeader
        topTitle="Payment Transfer"
        bottomTitle="Transfer details"
        topDescription="Please provide any specific details or notes related to the payment transfer"
        bottomDescription="Enter your transfer details"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm user={loggedIn} accounts={accountsData} />
      </section>
    </section>
  );
};

export default page;
