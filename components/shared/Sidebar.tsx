"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { InitialUser, useUserContext } from "@/context/AuthContext";
import { logoutAccount } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setIsAuthenticated } = useUserContext();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    setIsAuthenticated(false);
    setUser(InitialUser);

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  border-r border-gray-200 bg-white p-6 pt-8 text-white max-md:hidden lg:w-[355px]">
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 px-4">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={34}
            height={34}
            className="size-[34px] max-lg:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 max-lg:hidden">
            BANKIFY
          </h1>
        </Link>
        <div className="relative max-lg:hidden">
          <Input
            type="text"
            className="input-class pl-8"
            placeholder="Search"
          />
          <Image
            src="/icons/search.svg"
            alt="search"
            width={20}
            height={20}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        </div>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center p-4 rounded-lg justify-center lg:justify-start",
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
                  "text-16 font-semibold text-black-2 max-lg:hidden",
                  { "text-white": isActive }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <footer
        className="flex cursor-pointer items-center gap-2 px-4 pb-8 pt-6"
        onClick={handleLogOut}
      >
        <Image
          src={user.image || "icons/jsm.svg"}
          width={40}
          height={40}
          alt="jsm"
          className="rounded-full"
        />
        <div className="flex max-w-[70%] flex-col justify-center max-lg:hidden">
          <h1 className="text-14 font-semibold text-gray-700">{user.name}</h1>
          <p className="text-14  truncate font-normal text-gray-600">
            {user.email}
          </p>
        </div>
        <Image src="icons/logout.svg" width={20} height={20} alt="jsm" />
      </footer>
    </section>
  );
};

export default Sidebar;
