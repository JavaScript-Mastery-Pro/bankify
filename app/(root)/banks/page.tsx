import { BankCard } from "@/components/BankCard";
import { getAccounts } from "@/lib/actions/bank.actions";

const page = async () => {
  const accounts = await getAccounts();

  return (
    <section className="flex h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12">
      <header className="flex w-full items-start justify-between max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-30 font-semibold text-gray-900">My Banks</h1>
          <p className="text-16 font-normal text-gray-600">
            Below is the list of all your connected banks.
          </p>
        </div>
      </header>
      <div className="flex flex-wrap gap-6">
        {accounts &&
          accounts.data.map((account: Account) => (
            <BankCard
              key={account.id}
              account={account}
              userName={"Adrian Hajdin"}
            />
          ))}
      </div>
    </section>
  );
};

export default page;
