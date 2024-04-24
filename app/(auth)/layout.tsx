import Image from "next/image";
import { redirect } from "next/navigation";

import { getLoggedInUser } from "@/lib/actions/user.actions";

const RootLayoutAuth = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const loggedIn = await getLoggedInUser();
  // if (loggedIn) redirect("/");

  return (
    <main className="flex h-screen w-full justify-between font-inter">
      {children}
      <div className="flex size-full items-center justify-end bg-sky-1 max-lg:hidden">
        <div className="rounded-xl border-y-[6px] border-l-[6px] border-gray-900">
          <Image
            src="/icons/auth-image.svg"
            alt="Auth Image"
            width={500}
            height={500}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default RootLayoutAuth;
