import Image from "next/image";
import { redirect } from "next/navigation";

import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const loggedIn = await getLoggedInUser();
  // if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar
        userId={loggedIn.userId}
        name={loggedIn.name}
        email={loggedIn.email}
      />
      <div className="flex size-full flex-col ">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
          <div>
            {/* <MobileNav
              userId={loggedIn.userId}
              name={loggedIn.name}
              email={loggedIn.email}
            /> */}
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
