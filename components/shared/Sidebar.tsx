"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { logoutAccount } from "@/lib/actions/user.actions";
import { PlaidLink } from "@/components/shared/PlaidLink";

import { Input } from "../ui/input";

const Sidebar = ({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push("/sign-in");
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4  xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={34}
            height={34}
            className="size-[24px]  max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
            Horizon
          </h1>
        </Link>
        <div className="flex gap-1 rounded-lg border px-3 max-xl:hidden 2xl:px-4">
          <Image
            src="/icons/search.svg"
            alt="search"
            width={20}
            height={20}
            className=""
          />
          <Input type="text" className="border-none" placeholder="Search" />
        </div>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                {
                  "bg-bank-gradient": isActive,
                }
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn({
                  "brightness-[3] invert-0": isActive,
                })}
              />
              <p
                className={cn(
                  "text-16 font-semibold text-black-2 max-xl:hidden",
                  { "text-white": isActive }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={{ id: userId, name: name }} variant="ghost" />
      </nav>
      <footer
        className="flex cursor-pointer items-center justify-between gap-2 py-6"
        onClick={handleLogOut}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 max-xl:hidden">
          <p className="text-xl font-bold text-gray-700">{name[0]}</p>
        </div>

        <div className="flex-1 flex max-w-[70%] flex-col justify-center max-xl:hidden">
          <h1 className="text-14 font-semibold text-gray-700 line-clamp-1">
            {name}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600 line-clamp-1">
            {email}
          </p>
        </div>

        <Image src="icons/logout.svg" width={20} height={20} alt="jsm" />
      </footer>
    </section>
  );
};

export default Sidebar;
