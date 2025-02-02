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
import { getFlexDirection } from "../utils";
import { boolean } from "zod";

export default function AutonomousScreen() {
  const [currentAction, setCurrentAction] = useState<string>("");
  const [isCoralScoreSelectionOpen, setIsCoralScoreSelectionOpen] =
    useState(false);
  const [isCoralMissSelectionOpen, setIsCoralMissSelectionOpen] =
    useState(false);
  const [isDislodgeSelectionOpen, setIsDislodgeSelectionOpen] = useState(false);
  const context = useContext(ScoutDataContext);
  console.log(context.actions);

  const getScoreOrMiss = (
    isCoralMissSelectionOpen: boolean,
    isCoralScoreSelectionOpen: boolean
  ) => {
    if (isCoralScoreSelectionOpen) {
      return ACTION_NAMES.SCORE;
    }
    if (isCoralMissSelectionOpen) {
      return ACTION_NAMES.MISS;
    } else {
      return "something wrong here bruh";
    }
  };
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
          <div
            className={cn(
              "flex w-full h-full",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .row
            )}
          >
            <div className="flex flex-col items-center h-full gap-10 mx-2 mt-4">
              <Button className="text-xl font-bold w-52 h-16">
                Coral Pickup
              </Button>
              <Button className="text-xl font-bold w-52 h-16">
                Ground Intake Coral
              </Button>
              <Button className="dark:bg-teal-400 text-xl font-bold w-52 h-16">
                Ground Intake Algae
              </Button>
              <Button className="text-xl font-bold w-52 h-16">
                Coral Pickup
              </Button>
            </div>
            <div className="flex flex-col items-center justify-between h-full w-full gap-3 mx-28">
              <Popover
                open={isDislodgeSelectionOpen}
                onOpenChange={setIsDislodgeSelectionOpen}
              >
                <PopoverTrigger asChild>
                  <Button className="dark:bg-teal-400 text-xl font-bold w-44 h-16 my-20">
                    Algae Dislodge
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col w-auto gap-4"
                  side="right"
                >
                  <ScoutActionButton
                    actionName={ACTION_NAMES.DISLODGE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.REEF.L2}
                    className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                    label="L2"
                    isAuto
                    onClick={() => {
                      setIsDislodgeSelectionOpen(false);
                    }}
                  />
                  <ScoutActionButton
                    actionName={ACTION_NAMES.DISLODGE}
                    gamePiece={GAME_PIECES.ALGAE}
                    location={LOCATIONS.REEF.L3}
                    className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                    label="L3"
                    isAuto
                    onClick={() => {
                      setIsDislodgeSelectionOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex flex-col items-center justify-between">
                <Popover
                  open={isCoralScoreSelectionOpen || isCoralMissSelectionOpen}
                  onOpenChange={
                    setIsCoralMissSelectionOpen || setIsCoralScoreSelectionOpen
                  }
                >
                  <PopoverTrigger asChild>
                    <div className="flex flex-col ">
                      <Button
                        className="text-xl font-bold w-44 h-16"
                        onClick={() => {
                          setIsCoralScoreSelectionOpen(true);
                        }}
                      >
                        Coral Score
                      </Button>
                      <Button
                        className=" dark:bg-red-500 text-xl font-bold w-44 h-16 my-3"
                        onClick={() => {
                          setIsCoralMissSelectionOpen(true);
                        }}
                      >
                        Coral Miss
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col gap-3 w-auto"
                    side="right"
                    align="end"
                    alignOffset={84}
                  >
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelectionOpen,
                          isCoralScoreSelectionOpen
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L4}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L4"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelectionOpen,
                          isCoralScoreSelectionOpen
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L3}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L3"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelectionOpen,
                          isCoralScoreSelectionOpen
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L2}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L2"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelectionOpen,
                          isCoralScoreSelectionOpen
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={LOCATIONS.REEF.L1}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="L1"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                      }}
                    />
                    <ScoutActionButton
                      actionName={cn(
                        getScoreOrMiss(
                          isCoralMissSelectionOpen,
                          isCoralScoreSelectionOpen
                        )
                      )}
                      gamePiece={GAME_PIECES.CORAL}
                      location={"DON'T KNOW"}
                      className="font-bold text-xl dark:bg-yellow-500 w-40 h-14"
                      label="DON'T KNOW"
                      isAuto
                      onClick={() => {
                        setIsCoralScoreSelectionOpen(false);
                        setIsCoralMissSelectionOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col h-full mx-16 items-center">
              <div className="flex flex-col my-20 gap-5">
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 bg-white text-black"
                  actionName={ACTION_NAMES.SCORE}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto
                  label="Net Scored"
                />
                <ScoutActionButton
                  className="text-xl font-bold w-36 h-16 bg-red-500 text-black"
                  actionName={ACTION_NAMES.MISS}
                  gamePiece={GAME_PIECES.ALGAE}
                  location={LOCATIONS.NET}
                  isAuto
                  label="Net Miss"
                />
              </div>
              <Button className="dark:bg-teal-400 text-xl font-bold w-44 h-16">
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
