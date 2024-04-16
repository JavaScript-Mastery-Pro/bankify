"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useUserContext } from "@/context/AuthContext";
import { loginUser, signUpUser } from "@/lib/services";

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
  const { setIsAuthenticated } = useUserContext();

  const formSchema = z.object({
    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "name cannot be empty"),
    email: z.string().email(),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "ssn cannot be empty"),
    password: z.string().min(6, "password must be 6 character"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      ssn: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up" && data.name && data.ssn) {
        const userData = {
          email: data.email,
          name: data.name,
          password: data.password,
          ssn: data.ssn,
        };

        const onboardingLink = await signUpUser(userData);

        if (onboardingLink) {
          window.location.href = onboardingLink.url;
        }
      }

      if (type === "sign-in") {
        const session = await loginUser({
          email: data.email,
          password: data.password,
        });
        console.log({ session });

        if (session) {
          setIsAuthenticated(true);
          router.push("/");
        }
      }
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
            {type === "sign-in" ? "Sign in" : "Sign up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details.
          </p>
        </div>
      </header>
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
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-1.5">
                    <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                      Social Security Number
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="000000000"
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
              {type === "sign-in" ? "Sign in" : "Sign up"}
            </Button>
            {/* <Button
              variant="outline"
              className="text-16 rounded-lg border-gray-300 font-semibold text-gray-700 shadow-form"
            >
              <Image
                src="/icons/google.svg"
                alt="google"
                width={24}
                height={24}
              />
              &nbsp; Sign in with Google
            </Button> */}
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
