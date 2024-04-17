import DepositForm from "@/components/DepositForm";
import PageHeader from "@/components/shared/PageHeader";

const page = () => {
  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll p-8 md:max-h-screen xl:py-12">
      <PageHeader
        topTitle="New Deposit"
        bottomTitle="Deposit details"
        topDescription="Please provide any specific details or notes related to the deposit payment"
        bottomDescription="Enter the deposit details"
      />
      <section className="size-full">
        <DepositForm />
      </section>
    </section>
  );
};

export default page;
