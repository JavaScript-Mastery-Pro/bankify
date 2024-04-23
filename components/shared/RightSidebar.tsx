import Image from "next/image";

import { Category } from "@/components/shared/Category";
import { countTransactionCategories } from "@/lib/utils";

export const RightSidebar = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <Image
            src="/icons/jsm.svg"
            width={80}
            height={80}
            alt="jsm"
            className="profile-img"
          />

          <div className="profile-details">
            <h1 className="profile-name">Adrain Hajdin</h1>
            <p className="profile-email">adrian@jsmastery.pro</p>
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
