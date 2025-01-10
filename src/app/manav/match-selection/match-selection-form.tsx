"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function MatchSelectionForm() {
  const matchSelectionSchema = z.object({
    matchNumber: z
      .string({ required_error: "Match number is required" })
      .refine((val) => val.length > 0, {
        message: "Match number cannot be empty.",
      })
      .refine((val) => parseInt(val) > 0, {
        message: "Match number must be greater than zero",
      })
      .refine((val) => /^\d+$/.test(val), {
        message: "Match number must only contain numbers",
      }),
  });

  const matchSelectionForm = useForm<z.infer<typeof matchSelectionSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(matchSelectionSchema),
    defaultValues: {
      matchNumber: "",
    },
  });

  const onFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...matchSelectionForm}>
      <form
        onSubmit={matchSelectionForm.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4 w-80"
      >
        <FormField
          name="matchNumber"
          control={matchSelectionForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Match number here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="matchNumber"
          control={matchSelectionForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match selection</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"}>
                      Select Match <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent></PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="!bg-green-500 flex items-center justify-center text-black font-bold">
          Confirm
        </Button>
      </form>
    </Form>
  );
}
