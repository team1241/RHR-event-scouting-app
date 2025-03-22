"use client";

import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/text-area";

export default function PitScoutingForm() {
  const [isTeamSelectedOpen, setIsTeamSelectedOpen] = useState(false);
  return (
    <div className=" bg-slate-900 p-2 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <PageHeading>Pit Scouting Form</PageHeading>
      </div>
      <div className="flex flex-col gap-10 m-5">
        <div className="flex flex-col gap-2 w-fit">
          <p className="text-2xl font-semibold">Team Number: </p>
          <Popover
            open={isTeamSelectedOpen}
            onOpenChange={setIsTeamSelectedOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="flex flex-row justify-between h-16 text-xl w-auto"
              >
                Select Team
                <ChevronDownIcon className="!size-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={-64}>
              <h1>
                this command stuff is lowkey complicated and idrk forms so we
                saving this for later
              </h1>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Robot's length and width?</p>
          <Textarea
            placeholder="Enter dimensions here"
            className="resize-y w-3/4"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Robot's weight?</p>
          <Textarea
            placeholder="Enter weight here"
            className="resize-y w-3/4"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Drive base?</p>
          <RadioGroup>

          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Ground intake?</p>
          <RadioGroup>

          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Can they intake from the Reef?</p>
          <RadioGroup>

          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Algae scoring capability?</p>
          <RadioGroup>

          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Coral Scoring Capability?</p>
          <RadioGroup>

          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">What can they do in autos?</p>
          <Textarea
            placeholder="Enter autonomous cycles here"
            className="resize-y w-3/4"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Drive team experience?</p>
          <Textarea
            placeholder="Enter drive team experience here"
            className="resize-y w-3/4"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Anything else notable about the robot?</p>
          <Textarea
            placeholder="Enter comments here"
            className="resize-y w-3/4"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Upload image of robot:</p>
        </div>
      </div>
    </div>
  );
}
