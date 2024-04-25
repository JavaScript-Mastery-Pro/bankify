"use client";

import Image from "next/image";
import router from "next/router";

import { logoutAccount } from "@/lib/actions/user.actions";

const Footer = ({ user }: { user: User }) => {
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer
      className="flex cursor-pointer items-center justify-between gap-2 py-6"
      onClick={handleLogOut}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden">
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>

      <div className="flex  flex-1 flex-col justify-center max-xl:hidden">
        <h1 className="text-14 line-clamp-1 font-semibold text-gray-700">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-14 line-clamp-1 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>

      <div className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center">
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footer;
