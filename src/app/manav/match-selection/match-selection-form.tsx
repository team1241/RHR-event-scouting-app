"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function MatchSelectionForm({
  setTeamSelectedEnabled: setTeamSelectedEnabled,
}: {
  setTeamSelectedEnabled: (value: boolean) => void;
}) {
  const [isMatchSelectionOpen, setIsMatchSelectionOpen] = useState(false);

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

  const onFormSubmit = (values: z.infer<typeof matchSelectionSchema>) => {
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
            <FormItem className="flex flex-col">
              <FormControl>
                <Popover
                  open={isMatchSelectionOpen}
                  onOpenChange={setIsMatchSelectionOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="flex flex-row justify-between h-16 text-xl"
                    >
                      {field.value ? `Match ${field.value}` : "Select Match"}
                      <ChevronDownIcon className="!size-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent sideOffset={-64}>
                    <Command className="w-94">
                      <CommandInput
                        placeholder="Search Match"
                        className="h-16 text-xl"
                      />
                      <CommandList className="mb-4">
                        <CommandEmpty>Nothing found</CommandEmpty>
                        <CommandGroup>
                          {/* <CommandItem
                            onSelect={(value) => {
                              field.onChange(value);
                              setIsMatchSelectionOpen(false);
                            }}
                          >
                            Match 1
                          </CommandItem> */}
                          {Array.of(
                            [
                              1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                              15,
                            ].map((value, index) => (
                              <CommandItem
                                className="h-16 text-lg"
                                key={`match-dropdown-item-${index + 1}`}
                                onSelect={(value) => {
                                  const cleanVal = value.split(" ");

                                  field.onChange(cleanVal[1]);
                                  setIsMatchSelectionOpen(false);
                                  setTeamSelectedEnabled(true);
                                }}
                              >
                                {`Match ${value}`}
                              </CommandItem>
                            ))
                          )}
                          {/* <CommandItem
                            onSelect={(value) => {
                              const cleanVal = value.split(" ");

                              field.onChange(cleanVal[1]);
                              setIsMatchSelectionOpen(false);
                            }}
                          >
                            Match 3
                          </CommandItem> */}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
