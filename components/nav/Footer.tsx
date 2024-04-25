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
    <footer className="footer" onClick={handleLogOut}>
      <div className="footer_name">
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>

      <div className="ooter_email">
        <h1 className="text-14 line-clamp-1 font-semibold text-gray-700">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-14 line-clamp-1 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>

      <div className="footer_image">
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footer;
