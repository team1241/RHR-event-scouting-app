"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./common/field-image";
import { useContext, useState } from "react";
import { ScoutDataContext } from "../context";
import { cn } from "~/lib/utils";
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
import ContinueButton from "./common/continue-button";
import BackButton from "./common/back-button";
import UndoActionButton from "./common/undo-action-button";
import { getFlexDirection } from "../utils";
export default function EndgameScreen() {
  const context = useContext(ScoutDataContext);
  const [hangPositionSelected, setHangPositionSelected] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<string>("");
  const [isMatchSelectionOpen, setIsMatchSelectionOpen] = useState(false);
  console.log(context);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row justify-items-start gap-2">
          <div className="mt-4">
          <PageHeading>Endgame</PageHeading>
          </div>
          <UndoActionButton className="text-xl bg-red-600 h-16 w-40" />
        </div>
        <p className="text-2xl font-bold mt-4 ml-[5rem]">{`Action Selected: ${currentAction} `}</p>
      </div>

      <FieldImage imageSize="100%" fieldSize="half">
        <div className={cn("flex justify-between gap-20 h-full",
          getFlexDirection(context.uiOrientation, context.allianceColour).row
        )}
          
        >
          <div className="flex flex-col justify-stretch h-full mx-28 my-6">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.SHALLOW}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setCurrentAction("Successfully Climbed Shallow");
              }}
              disabled={hangPositionSelected === ""}
            >
              Shallow Hang
            </ScoutActionButton>
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setCurrentAction("Successfully Climbed Deep");
              }}
              disabled={hangPositionSelected === ""}
            >
              Deep Hang
            </ScoutActionButton>

            <ScoutActionButton
              actionName={ACTION_NAMES.PARK}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setCurrentAction("Successfully Parked");
              }}
              disabled={hangPositionSelected === ""}
            >
              Park
            </ScoutActionButton>

            <Popover
              open={isMatchSelectionOpen}
              onOpenChange={setIsMatchSelectionOpen}
            >
              <PopoverTrigger disabled={hangPositionSelected === ""}>
                <Button
                  className=" mb-1 h-16 w-40 font-bold text-xl !text-white !bg-pink-600"
                  disabled={hangPositionSelected === ""}
                >
                  {" "}
                  Failed Attempt
                </Button>
              </PopoverTrigger>
              
              <PopoverContent className="w-[12rem]" 
              side="right" >
                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.SHALLOW}
                  location={hangPositionSelected}
                  className="mb-1 h-16 w-40 font-bold text-xl !bg-pink-600"
                  onClick={() => {
                    setCurrentAction("Shallow Climb Failed ");
                    setIsMatchSelectionOpen(false);
                  }}
                >
                  Shallow Hang
                </ScoutActionButton>
                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.DEEP}
                  location={hangPositionSelected}
                  className=" mb-1 h-16 w-40 font-bold text-xl !bg-pink-600"
                  onClick={() => {
                    setCurrentAction("Deep Climb Failed");
                    setIsMatchSelectionOpen(false);
                  }}
                >
                  Deep Hang
                </ScoutActionButton>
              </PopoverContent>

            </Popover>

            {/* <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.FAIL}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl"
              onClick={() => {
                setCurrentAction("Successfully Climbed Deep");
              }}
            >
              Failed Climb
            </ScoutActionButton> */}
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.NOTHING}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              disabled={hangPositionSelected === ""}
            >
              Not Attempted
            </ScoutActionButton>
          </div>
          <div className="flex flex-col justify-stretch my-[4rem] gap-2 mx-[5rem] pt-8">
            <Button
              className={cn(
                " h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.OUTER &&
                  "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setHangPositionSelected(LOCATIONS.BARGE.OUTER);
              }}
            >
              Far Cage
            </Button>
            <Button
              className={cn(
                " h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.MIDDLE &&
                  "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setHangPositionSelected(LOCATIONS.BARGE.MIDDLE);
              }}
            >
              Middle Cage
            </Button>
            <Button
              className={cn(
                " mb-1 h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.INNER &&
                  "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setHangPositionSelected(LOCATIONS.BARGE.INNER);
              }}
            >
              Near Cage
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-between mt-14 ">
        <BackButton></BackButton>

        <ContinueButton disabled={currentAction === ""}></ContinueButton>
      </div>
    </>
  );
}
