"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  amount: z.string().min(1),
  category: z.enum(["Subscribtions", "Food", "Income", "Groceries", "Deposit"]),
  note: z.string().optional(),
});

const DepositModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      category: "Deposit",
      note: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log({ data });
    setIsLoading(true);
  };
  return (
    <>
      <Button
        variant="outline"
        className="text14_padding10 border-gray-300 text-gray-700 shadow-form"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/icons/dollar.svg"
          width={20}
          height={20}
          alt="dollar icon"
        />
        &nbsp; Deposit
      </Button>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex w-full flex-col gap-2">
                      <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                        Amount
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
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex w-full justify-between gap-2">
                        <FormLabel className="text-14 font-medium text-gray-700">
                          Transfer Note (Optional)
                        </FormLabel>
                      </div>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Textarea
                            placeholder="Write your note here"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex w-full flex-col gap-2">
                      <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                        Select Category
                      </FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Subscribtions",
                                "Food",
                                "Income",
                                "Groceries",
                                "Deposit",
                              ].map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-12 text-red-500" />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex w-full  gap-3 border-t border-gray-200 py-5">
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
                      Sending...
                    </>
                  ) : (
                    "Deposit Funds"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepositModal;
