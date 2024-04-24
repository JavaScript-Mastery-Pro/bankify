import Image from "next/image";

import { Category } from "@/components/shared/Category";
import { countTransactionCategories } from "@/lib/utils";

export const RightSidebar = ({
  name,
  email,
  transactions,
}: {
  name: string;
  email: string;
  transactions: Transaction[];
}) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold">{name[0]}</span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{name}</h1>
            <p className="profile-email">{email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex flex-1 flex-col gap-6">
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
