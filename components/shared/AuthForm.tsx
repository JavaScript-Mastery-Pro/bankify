"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ID } from "appwrite";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PlaidLink } from "@/components/shared/PlaidLink";
import { useUserContext } from "@/context/AuthContext";
import { createLinkToken } from "@/lib/actions/user.actions";
import { account } from "@/lib/appwrite/config";
import { loginUser } from "@/lib/services/index";

import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface AuthFormProps {
  type: "sign-in" | "sign-up" | "connect";
  id?: string;
}

const AuthForm = ({ type, id }: AuthFormProps) => {
  const router = useRouter();

  const { setIsAuthenticated } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [accountId, setAccountId] = useState("");
  const [linkToken, setLinkToken] = useState(null);

  const formSchema = z.object({
    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "name cannot be empty"),
    email: z.string().email(),
    password: z.string().min(8, "password must be 8 character"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          name: data.name,
          password: data.password,
        };

        // Create appwrite account
        const newAppwriteAccount = await account.create(
          ID.unique(),
          userData.email,
          userData.password,
          userData.name
        );

        if (newAppwriteAccount) {
          const accountId = newAppwriteAccount?.$id as string;

          router.push(`/connect/${accountId}`);
          setAccountId(accountId);
        }
      }

      if (type === "sign-in") {
        const session = await loginUser({
          email: data.email,
          password: data.password,
        });

        if (session) {
          setIsAuthenticated(true);
          router.push("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const generateToken = async () => {
    if (id) {
      const token = await createLinkToken(id);

      if (token) {
        setLinkToken(token);
        console.log({ linkToken });
      }
    }
  };

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
          <h1 className="text-24 lg:text-36 font-semibold capitalize text-gray-900">
            {type}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {type === "connect"
              ? "Generate a token to add bank"
              : "Please enter your details."}
          </p>
        </div>
      </header>

      {type === "connect" ? (
        <Button
          type="button"
          className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
          onClick={generateToken}
        >
          Generate Token
        </Button>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5 md:gap-8"
          >
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-1.5">
                      <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                        Name
                      </FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            placeholder="Enter account holder name"
                            className="input-class"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-12 text-red-500" />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-1.5">
                    <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-12 text-red-500" />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-1.5">
                    <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-12 text-red-500" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      <footer className="flex justify-center gap-1">
        {accountId !== "" && <PlaidLink linkToken={linkToken} />}
        <p className="text-14 font-normal text-gray-600">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="text-14 cursor-pointer font-medium text-bankGradient"
        >
          {type === "sign-in" ? "Sign up" : "Sign in"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
