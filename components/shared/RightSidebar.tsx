import Image from "next/image";

export const RightSidebar = () => {
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
          <header className="flex w-full justify-between">
            <h2 className="header-2 ">My Banks</h2>
            {/* <div className="flex gap-2">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus icon"
              />
              <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
            </div> */}
          </header>
          {/* <div className="max-xl:flex-center relative">
            <BankCard
              key={account.id}
              account={account}
              userName={"Adrian Hajdin"}
            />
          </div> */}
        </div>
      </section>
    </aside>
  );
};
