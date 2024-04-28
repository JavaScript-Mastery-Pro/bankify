"use client";

import Image from "next/image";
import router from "next/router";

import { logoutAccount } from "@/lib/actions/user.actions";

const Footer = ({ user, type }: FooterProps) => {
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer className="footer" onClick={handleLogOut}>
      <div
        className={`${type === "desktop" ? "footer_name" : "footer_name-mobile"}`}
      >
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>

      <div
        className={`flex-1 ${type === "desktop" ? "footer_email" : "footer_email-mobile"}`}
      >
        <h1 className="text-14 font-semibold text-gray-700">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>

      <div
        className={`${type === "desktop" ? "footer_image" : "footer_image-mobile"}`}
      >
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footer;
