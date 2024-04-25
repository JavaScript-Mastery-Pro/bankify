import Image from "next/image";
import Link from "next/link";

import { Category } from "@/components/Category";
import { countTransactionCategories } from "@/lib/utils";
import BankCard from "../bank/BankCard";

export const RightSidebar = ({
  user,
  transactions,
  banks,
}: {
  user: User;
  transactions: Transaction[];
  banks: any;
}) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  console.log({ banks });
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus icon"
            />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].id}
                account={banks[0]}
                userName={user.firstName + user.lastName}
                showBalance={false}
              />
            </div>
            {/* <div className="absolute right-0 top-8 z-0 w-[90%]">
              <BankCard
                key={banks[1].id}
                account={banks[1]}
                userName={user.firstName + user.lastName}
                showBalance={false}
              />
            </div> */}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2 ">Top Categories</h2>

          <div className="space-y-5">
            {categories.map((category, index) => (
              <Category key={category.name + index} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};
