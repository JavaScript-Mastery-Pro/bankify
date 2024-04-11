import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <section className="flex w-full max-w-[365px] flex-col gap-5 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />{" "}
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BANKIFY
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {type === "sign-in" ? "Sign in" : "Sign up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details.
          </p>
        </div>
      </header>
      <form className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-5">
          <div
            className={cn("flex flex-col gap-1.5", {
              hidden: type === "sign-in",
            })}
          >
            <Label className="text-14 font-medium text-gray-700">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              className="text-16 placeholder:text-16 rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-500 shadow-form placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-14 font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-16 placeholder:text-16 rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-500 shadow-form placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-14 font-medium text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="text-16 placeholder:text-16 rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-500 shadow-form placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
          >
            {type === "sign-in" ? "Sign in" : "Sign up"}
          </Button>
          <Button className="text-16 rounded-lg border border-gray-300 bg-transparent font-semibold text-gray-700 shadow-form">
            <Image
              src="/icons/google.svg"
              alt="google"
              width={24}
              height={24}
            />
            &nbsp; Sign in with Google
          </Button>
        </div>
      </form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href="/sign-in"
          className="text-14 cursor-pointer font-medium text-bankGradient"
        >
          {type === "sign-in" ? "Sign up" : "Sign in"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
