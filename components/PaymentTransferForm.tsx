"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PlaidLink } from "@/components/shared/PlaidLink";
import { createTransfer } from "@/lib/actions/dwolla.actions";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,

  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

// import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  // amount: z.string().min(4, "Name is too short"),
  // emailAddress: z.string().email("Invalid email address"),
  // transferNote: z.string().optional(),
  // accountNumber: z
  //   .string()
  //   .min(15, "account number must be exact 15 character")
  //   .max(15),
  name: z.string().min(4, "name must be 4 character"),
});

const PaymentTransferForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // amount: "",
      // emailAddress: "",
      // transferNote: "",
      // accountNumber: "",
      // branchcode: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("submit handler");
    const transferParams = {
      sourceFundingSourceUrl:
        "https://api-sandbox.dwolla.com/funding-sources/37f99064-fa0a-4465-8c83-ea9352722a3d",
      destinationFundingSourceUrl:
        "https://api-sandbox.dwolla.com/funding-sources/765898fb-a41d-4e19-ab1e-e371975a2acd",
      amount: "15.00",
    };

    try {
      const transfer = await createTransfer(transferParams);
      console.log({ transfer });
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 pb-5 pt-6 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Full Name
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Nikky Eva"
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
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 py-5 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="nikkyeva@gmail.com"
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
        {/* <FormField
          control={form.control}
          name="transferNote"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 pb-6 pt-5 md:flex-row lg:gap-8">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Dear Nikky,
                      I hope this message finds you well. I am transferring $100 to your account for fun. Please confirm once you receive it."
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
        <div className="flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>
        {/* <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 pb-5 pt-6 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Bank Account Number
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the account number"
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
        {/* <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 py-5 md:flex-row lg:gap-8">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input placeholder="5" className="input-class" {...field} />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        /> */}
        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-t border-gray-200 py-5">
          <PlaidLink
            user={user}
            dwollaCustomerId="a829a40a-3241-42c9-a3e5-f30321693026"
          />
          {/* <Button
            variant="outline"
            className="text-14 w-full border-gray-300 font-semibold text-gray-700 shadow-form"
            onClick={() => form.reset()}
          >
            Cancel
          </Button> */}
          <Button
            type="submit"
            className="text-14 w-full bg-bank-gradient font-semibold text-white shadow-form"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Send Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
