"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useUserContext } from "@/context/AuthContext";
import { createBankAccount } from "@/lib/services";
import { createExternalAccount, generateBankToken } from "@/lib/stripe";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  accountHolderName: z.string().min(4, "Name is too short"),
  accountNumber: z
    .string()
    .min(12, "account number must be exact 12 character")
    .max(12),
  routingNumber: z
    .string()
    .min(9, "routing number must be exact 9 character")
    .max(9),
});

const ConnectAccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const tokenData = {
        accountHolderName: data.accountHolderName,
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
      };

      const bankToken = await generateBankToken(tokenData);

      if (bankToken) {
        const bankData = {
          stripeId: user.stripeId,
          bankToken: bankToken.id,
          userId: user.id,
        };

        console.log({ bankToken });

        const externalAccount = await createExternalAccount(bankData);
        console.log({ externalAccount });

        if (externalAccount) {
          const externalAccountData = {
            stripeBankId: externalAccount.id,
            accountHolderName: externalAccount.account_holder_name,
            user: externalAccount?.metadata?.userId! || "",
            externalAccount: externalAccount.id,
            routingNumber: externalAccount.routing_number,
            bankName: externalAccount.bank_name,
          };

          console.log({ externalAccountData });

          const newBank = await createBankAccount(externalAccountData);
          console.log({ newBank });
          router.push("/");
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 pb-5 pt-6 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Bank Account Holder Name
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
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 py-5 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Bank Account Number
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-10 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="routingNumber"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 py-5 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Routing Number
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="426568"
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
        {/* <FormField
          control={form.control}
          name="branchcode"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="md:flex-row flex w-full max-w-[850px] flex-col gap-3 py-5 lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  IFSC/Bank branch
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="UTC−08:00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        /> */}
        <div className="flex w-full max-w-[850px] gap-3 border-t border-gray-200 py-5">
          <Button
            variant="outline"
            className="text-14 w-full border-gray-300 font-semibold text-gray-700 shadow-form"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-14 w-full bg-bank-gradient font-semibold text-white shadow-form"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp;
                Submitting...
              </>
            ) : (
              "Connect Bank Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ConnectAccountForm;
