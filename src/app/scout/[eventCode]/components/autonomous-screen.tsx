"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import FieldImage from "./common/field-image";
import ContinueButton from "./common/continue-button";
import UndoActionButton from "./common/undo-action-button";
import ScoutActionButton from "./common/scout-action-button";
import {
  GAME_PIECES,
  LOCATIONS,
  ACTION_NAMES,
} from "~/app/scout/[eventCode]/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { useContext, useState } from "react";
import { ScoutDataContext } from "../context";

export default function AutonomousScreen() {
  const [currentAction, setCurrentAction] = useState<string>("");
  const [isDislodgeSelectionOpen, setIsDislodgeSelectionOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Autonomous</PageHeading>
          <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
          {/* <Button className="text-2xl font-bold w-36 h-16 dark:bg-red-600">UNDO</Button> */}
        </div>
        <div className="flex items-center space-x-4 bg-black/90 font-bold p-3 rounded-lg">
          <Checkbox id="leaves" className="size-7" />
          <label
            htmlFor="leaves"
            className="text-4xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Left starting line?
          </label>
        </div>
      </div>
      <div>
        <FieldImage imageSize="100%" fieldSize="half">
          <div className="flex flex-row w-full h-full">
            <div className="flex flex-col justify-center h-full gap-10 mx-2">
              <Button className="text-xl font-bold w-52 h-16">
                Coral Pickup
              </Button>
              <Button className="text-xl font-bold w-52 h-16">
                Ground Intake Coral
              </Button>
              <Button className="dark:bg-green-500 text-xl font-bold w-52 h-16">
                Ground Intake Algae
              </Button>
              <Button className="text-xl font-bold w-52 h-16">
                Coral Pickup
              </Button>
            </div>
            <div className="flex flex-col h-full gap-3 mx-28">
              <Popover
                open={isDislodgeSelectionOpen}
                onOpenChange={setIsDislodgeSelectionOpen}
              >
                <PopoverTrigger>
                  <Button className="dark:bg-green-500 text-xl font-bold w-44 h-16 my-20">
                    Algae Dislodge
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <ScoutActionButton
                    actionName={ACTION_NAMES.DISLODGE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.REEF.L2}
                    className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                    onClick={() => {
                      setIsDislodgeSelectionOpen(false);
                    }}
                  >
                    L2
                  </ScoutActionButton>
                </PopoverContent>
              </Popover>
              <Button className="text-xl font-bold w-44 h-16">
                Coral Score
              </Button>
              <Button className="dark:bg-red-500 text-xl font-bold w-44 h-16">
                Coral Miss
              </Button>
            </div>
            <div className="flex flex-col h-full mx-16 items-center">
              <div className="flex flex-col my-20 gap-5">
                <Button className="text-xl font-bold w-36 h-16">
                  Net Scored
                </Button>
                <Button className="dark:bg-red-500 text-xl font-bold w-36 h-16">
                  Net Missed
                </Button>
              </div>
              <Button className="dark:bg-green-500 text-xl font-bold w-44 h-16">
                Processor Score
              </Button>
            </div>
          </div>
        </FieldImage>
      </div>
      <div className="flex flex-row justify-end">
        <ContinueButton></ContinueButton>
      </div>
    </div>
  );
}
