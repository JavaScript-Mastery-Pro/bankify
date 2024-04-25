"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { PlaidLink } from "@/components/PlaidLink";

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex cursor-pointer items-center gap-2 mb-12">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={34}
            height={34}
            className="size-[24px]  max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient": isActive,
              })}
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
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} variant="ghost" />
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
