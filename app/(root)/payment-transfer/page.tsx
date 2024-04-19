import PaymentTransferForm from "@/components/PaymentTransferForm";
import PageHeader from "@/components/shared/PageHeader";

const page = () => {
  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <PageHeader
        topTitle="Payment Transfer"
        bottomTitle="Transfer details"
        topDescription="Please provide any specific details or notes related to the payment transfer"
        bottomDescription="Enter the details of the recipient"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm />
      </section>
    </section>
  );
};

export default page;
