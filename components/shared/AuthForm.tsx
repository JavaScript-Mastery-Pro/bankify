"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PlaidLink } from "@/components/shared/PlaidLink";
import { signIn, signUp } from "@/lib/actions/user.actions";

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
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "firstName cannot be empty"),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "lastName cannot be empty"),
    email: z.string().email(),
    address1:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "address1 cannot be empty"),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "city cannot be empty"),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(2, "state cannot be empty").max(2),
    postalCode:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "postalCode cannot be empty"),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "dateOfBirth cannot be empty"),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(4, "ssn cannot be empty").max(4),
    password: z.string().min(8, "password must be 8 character"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // SIGN-UP WITH APPWRITE & CREATE PLAID LINK TOKEN
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        // Create appwrite user account & link token
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign in" : "Sign up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details."}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              First Name
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input className="input-class" {...field} />
                              </FormControl>
                              <FormMessage className="text-12 text-red-500" />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              Last Name
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input className="input-class" {...field} />
                              </FormControl>
                              <FormMessage className="text-12 text-red-500" />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-1.5">
                          <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                            Address
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                placeholder="Specific address"
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-1.5">
                          <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                            City
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input className="input-class" {...field} />
                            </FormControl>
                            <FormMessage className="text-12 text-red-500" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              State
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder="ex: NY"
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
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              Postal Code
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder="ex: 11101"
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
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              Date of Birth
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder="yyyy-mm-dd"
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
                      name="ssn"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-1.5">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                              SSN
                            </FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder="ex: 1234"
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
                  </div>
                </>
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

          <footer className="flex justify-center gap-1">
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
        </>
      )}
    </section>
  );
};

export default AuthForm;
