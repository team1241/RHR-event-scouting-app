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
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useContext } from "react";
import { ScoutDataContext } from "../../context";
import { Checkbox } from "~/components/ui/checkbox";

export default function MatchSelectionForm({
  setTeamSelectedEnabled: setTeamSelectedEnabled,
}: {
  setTeamSelectedEnabled: (value: boolean) => void;
}) {
  const context = useContext(ScoutDataContext);
  const [isMatchSelectionOpen, setIsMatchSelectionOpen] = useState(false);
  const [isReplayChecked, setIsReplayChecked] = useState(
    context.matchNumber.includes(`R`)
  );
  const [matchDropdownValue, setMatchDropdownValue] = useState(() => {
    const matches = context.matchNumber.match(/\d+/g);
    if (matches && matches.length > 0) {
      return `Qualification ${matches[0]}`;
    }
    return "";
  });

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

  return (
    <Form {...matchSelectionForm}>
      <form className="flex flex-col gap-4 w-80">
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
                      {matchDropdownValue !== ""
                        ? matchDropdownValue
                        : "Select Match"}
                      <ChevronDownIcon className="!size-6" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent sideOffset={-64}>
                    <Command
                      className="w-94"
                      value={matchDropdownValue}
                      onValueChange={setMatchDropdownValue}
                    >
                      <CommandInput
                        placeholder="Search Match"
                        className="h-16 text-xl"
                      />
                      <CommandList className="mb-4">
                        <CommandEmpty>Nothing found</CommandEmpty>
                        <CommandGroup>
                          {context.matchSchedule.map((match, index) => (
                            <CommandItem
                              className="h-16 text-lg"
                              key={`match-dropdown-item-${index + 1}`}
                              onSelect={(value) => {
                                const cleanVal = value.split(" ");

                                field.onChange(cleanVal[1]);
                                context.setMatchNumber(
                                  `${
                                    context.eventType === "practice" ? "P" : "Q"
                                  }${cleanVal[1]}`
                                );
                                setIsMatchSelectionOpen(false);
                                setTeamSelectedEnabled(true);
                                setIsReplayChecked(false);

                                context.setAllianceColour("");
                                context.setCurrentMatch(match);
                                context.setTeamToScout("");
                              }}
                            >
                              {`${
                                context.eventType === "practice"
                                  ? "Practice"
                                  : "Qualification"
                              } ${match.matchNumber}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <div className="flex flex-row items-center pt-8">
                <Checkbox
                  className="size-12 "
                  id="replay"
                  checked={isReplayChecked}
                  disabled={context.matchNumber === ""}
                  onCheckedChange={(newValue) => {
                    setIsReplayChecked(!isReplayChecked);
                    if (newValue) {
                      context.setMatchNumber(`${context.matchNumber}R`);
                    } else {
                      context.setMatchNumber(
                        `${context.matchNumber.substring(
                          0,
                          context.matchNumber.length - 1
                        )}`
                      );
                    }
                  }}
                />
                <FormLabel htmlFor="replay" className="pl-6 !text-3xl">
                  {" "}
                  Is Replay?
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
