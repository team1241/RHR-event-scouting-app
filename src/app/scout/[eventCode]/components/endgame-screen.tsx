"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./common/field-image";
import { useContext, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
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
  const screenContext = useContext(ScoutScreenContext);
  const [hangPositionSelected, setHangPositionSelected] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<string>("");
  const [isMatchSelectionOpen, setIsMatchSelectionOpen] = useState(false);
  const [actionDone, setActionDone] = useState(false);
  const [positionSelected, setPositionSelected] = useState(false);
  function checkActionButtonDisabled() {
    let disability = false;
    if (!positionSelected || actionDone) {
      disability = true;
    }

    return disability;
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row justify-items-start gap-2">
          <div className="mt-4">
            <PageHeading>Endgame</PageHeading>
          </div>
          <UndoActionButton
            onClick={() => {
              if (hangPositionSelected !== "") {
                setHangPositionSelected("");
                setActionDone(false);
                setCurrentAction("");
                setPositionSelected(false);
              }
            }}
            className="text-xl bg-red-600 h-16 w-40"
          />
        </div>
        <p className="text-2xl font-bold mt-4 ml-[5rem]">{`Action Selected: ${currentAction} `}</p>
      </div>

      <FieldImage imageSize="100%" fieldSize="half">
        <div
          className={cn(
            "flex justify-between gap-20 h-full",
            getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div className="flex flex-col justify-stretch h-full mx-28 my-14">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.SHALLOW}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Climbed Shallow");
              }}
              disabled={checkActionButtonDisabled()}
              label="Shallow Hang"
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Climbed Deep");
              }}
              disabled={checkActionButtonDisabled()}
              label="Deep Hang"
            />

            <ScoutActionButton
              actionName={ACTION_NAMES.PARK}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Parked");
              }}
              disabled={checkActionButtonDisabled()}
              label="Park"
            />

            <Popover
              open={isMatchSelectionOpen}
              onOpenChange={setIsMatchSelectionOpen}
            >
              <PopoverTrigger disabled={checkActionButtonDisabled()}>
                <Button
                  className=" mb-1 h-16 w-40 font-bold text-xl !text-white !bg-pink-600"
                  disabled={checkActionButtonDisabled()}
                >
                  {" "}
                  Failed Attempt
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[12rem]" side="right">
                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.SHALLOW}
                  location={hangPositionSelected}
                  className="mb-1 h-16 w-40 font-bold text-xl !bg-pink-600"
                  onClick={() => {
                    setActionDone(true);
                    setCurrentAction("Shallow Climb Failed ");
                    setIsMatchSelectionOpen(false);
                  }}
                  disabled={checkActionButtonDisabled()}
                  label="Shallow Hang"
                />

                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.DEEP}
                  location={hangPositionSelected}
                  className=" mb-1 h-16 w-40 font-bold text-xl !bg-pink-600"
                  onClick={() => {
                    setActionDone(true);
                    setCurrentAction("Deep Climb Failed");
                    setIsMatchSelectionOpen(false);
                  }}
                  disabled={checkActionButtonDisabled()}
                  label="Deep Hang"
                />
              </PopoverContent>
            </Popover>
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.NOTHING}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className=" mb-1 h-16 w-40 font-bold text-xl bg-pink-600"
              disabled={checkActionButtonDisabled()}
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Endgame action skipped");
              }}
              label="Not Attempted"
            />
          </div>
          <div
            className={cn(
              "flex flex-col justify-stretch my-[3rem] gap-2 mx-[5rem]",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .col
            )}
          >
            <Button
              className={cn(
                " h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.OUTER &&
                  "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.OUTER);
              }}
              disabled={hangPositionSelected !== ""}
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
                setPositionSelected(true);
              }}
              disabled={hangPositionSelected !== ""}
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
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.INNER);
              }}
              disabled={hangPositionSelected !== ""}
            >
              Near Cage
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-between mt-14 ">
        <BackButton
          onClick={() => {
            screenContext.prevScreen();
          }}
        />

        <ContinueButton
          disabled={currentAction === "" || context.isTimerRunning}
          onClick={() => {
            screenContext.nextScreen();
          }}
        />
      </div>
    </>
  );
}
