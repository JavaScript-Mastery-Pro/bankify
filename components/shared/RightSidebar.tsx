import Image from "next/image";

import { BankCard } from "../BankCard";

export const RightSidebar = ({ accounts = [] }: { accounts: Account[] }) => {
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
          <h2 className="header-2 ">My Banks</h2>

          <div className="space-y-5">
            {accounts.map((account) => (
              <BankCard
                key={account.id}
                account={account}
                userName={"Adrian Hajdin"}
              />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};
