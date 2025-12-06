"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./common/field-image";
import { useContext, useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import { cn } from "~/lib/utils";
import ScoutActionButton from "./common/scout-action-button";
import {
  GAME_PIECES,
  LOCATIONS,
  ACTION_NAMES,
} from "~/app/scout/[eventCode]/constants";
import ContinueButton from "./common/continue-button";
import BackButton from "./common/back-button";
import UndoActionButton from "./common/undo-action-button";
import { getFlexDirection } from "~/app/scout/[eventCode]/utils";
import { toast } from "sonner";

export default function EndgameScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [hangPositionSelected, setHangPositionSelected] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<string>("");
  const [actionDone, setActionDone] = useState(false);
  const [positionSelected, setPositionSelected] = useState(false);
  const [climbStarted, setClimbStarted] = useState(false);

  function checkActionButtonDisabled() {
    return !positionSelected || actionDone;
  }

  useEffect(() => {
    setCurrentAction(context.previousEndgameAction.actionMessage);
    setActionDone(context.previousEndgameAction.actionDone);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row justify-items-start gap-2">
          <div className="mt-4">
            <PageHeading>Endgame</PageHeading>
          </div>
          <UndoActionButton
            onClick={() => {
              setHangPositionSelected("");
              setActionDone(false);
              setPositionSelected(false);
              setClimbStarted(false);
              setCurrentAction("");
              context.setPreviousEndgameAction({
                actionDone: false,
                positionSelected: "",
                actionMessage: "",
              });
            }}
            className="text-xl bg-red-600 h-16 w-40"
          />
        </div>
        <p className="text-2xl font-bold mt-4 ml-[5rem]">{`Most Recent: ${currentAction} `}</p>
      </div>

      <FieldImage imageSize="100%" fieldSize="half">
        <div
          className={cn(
            "flex justify-evenly gap-20 h-full",
            getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div className="flex flex-col justify-evenly h-full">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                setActionDone(true);
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Climbed Deep",
                });

                toast.error("Robot climbed deep cage!");
                setCurrentAction("Successfully Climbed Deep Cage");
                setClimbStarted(false);
                setHangPositionSelected("");
                setPositionSelected(false);
              }}
              disabled={
                checkActionButtonDisabled() ||
                !climbStarted ||
                context.isBrownedOut
              }
              label="Deep Hang"
              shouldBeHidden={false}
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.SHALLOW}
              location={hangPositionSelected}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                setActionDone(true);
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Climbed Shallow",
                });
                toast.error("Robot climbed shallow cage!");
                setCurrentAction("Successfully Climbed Shallow Cage");
                setClimbStarted(false);
                setHangPositionSelected("");
                setPositionSelected(false);
              }}
              disabled={
                checkActionButtonDisabled() ||
                !climbStarted ||
                context.isBrownedOut
              }
              label="Shallow Hang"
              shouldBeHidden={false}
            />

            <ScoutActionButton
              actionName={ACTION_NAMES.PARK}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                setActionDone(true);
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Parked",
                });

                toast.error("Robot parked!");
                setCurrentAction("Successfully Parked");
                setHangPositionSelected("");
                setPositionSelected(false);
              }}
              disabled={
                checkActionButtonDisabled() ||
                climbStarted ||
                context.isBrownedOut
              }
              label="Park"
              shouldBeHidden={false}
            />

            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.FAIL}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className={
                "mb-1 h-16 w-40 font-bold text-xl !bg-red-500 text-black"
              }
              onClick={() => {
                setActionDone(true);
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Deep Climb Failed",
                });
                toast.error("Robot failed deep climb!");
                setCurrentAction("Deep Climb Failed");
                setClimbStarted(false);
                setHangPositionSelected("");
                setPositionSelected(false);
              }}
              disabled={
                checkActionButtonDisabled() ||
                climbStarted === false ||
                context.isBrownedOut
              }
              label="Failed Deep"
              shouldBeHidden={false}
            />

            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.FAIL}
              gamePiece={GAME_PIECES.CAGE.SHALLOW}
              location={hangPositionSelected}
              className={
                "mb-1 h-16 w-40 font-bold text-xl !bg-red-500 text-black"
              }
              onClick={() => {
                setActionDone(true);
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Shallow Climb Failed ",
                });
                toast.error("Robot failed shallow climb!");
                setCurrentAction("Shallow Climb Failed ");
                setClimbStarted(false);
                setHangPositionSelected("");
                setPositionSelected(false);
              }}
              disabled={
                checkActionButtonDisabled() ||
                climbStarted === false ||
                context.isBrownedOut
              }
              label="Failed Shallow"
              shouldBeHidden={false}
            />
          </div>

          <div className="flex flex-col justify-center h-full gap-4">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.START}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className={
                "mb-1 h-16 w-40 font-bold text-xl !bg-green-700 !text-white"
              }
              onClick={() => {
                toast.error("Climb started!");
                setCurrentAction("Started Climb Attempt");
                setClimbStarted(true);
              }}
              label="Start Climb"
              shouldBeHidden={false}
              disabled={
                !positionSelected || !!currentAction || context.isBrownedOut
              }
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.NOTHING}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={LOCATIONS.BARGE.BASE}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-red-500"}
              disabled={
                climbStarted ||
                positionSelected ||
                actionDone ||
                context.isBrownedOut
              }
              onClick={() => {
                setActionDone(true);
                toast.error("Robot did not attempt endgame action!");
                setCurrentAction("Endgame action skipped");
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Endgame action skipped",
                });
              }}
              label="Not Attempted"
              shouldBeHidden={false}
            />
          </div>

          <div
            className={cn(
              "flex flex-col my-[3rem] gap-2",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .col
            )}
          >
            <Button
              className={cn(
                "h-12 w-40 font-bold text-xl !bg-white opacity-80",
                hangPositionSelected === LOCATIONS.BARGE.OUTER &&
                  "dark:ring-4 ring-red-500"
              )}
              onClick={() => {
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.OUTER);
              }}
              disabled={actionDone || context.isBrownedOut}
            >
              Far Cage
            </Button>
            <Button
              className={cn(
                " h-12 w-40  font-bold text-xl !bg-white opacity-80",
                hangPositionSelected === LOCATIONS.BARGE.MIDDLE &&
                  "dark:ring-4 ring-red-500"
              )}
              onClick={() => {
                setHangPositionSelected(LOCATIONS.BARGE.MIDDLE);
                setPositionSelected(true);
              }}
              disabled={actionDone || context.isBrownedOut}
            >
              Middle Cage
            </Button>
            <Button
              className={cn(
                " mb-1 h-12 w-40  font-bold text-xl !bg-white opacity-80",
                hangPositionSelected === LOCATIONS.BARGE.INNER &&
                  "dark:ring-4 ring-red-500"
              )}
              onClick={() => {
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.INNER);
              }}
              disabled={actionDone || context.isBrownedOut}
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

        <ScoutActionButton
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={
            context.isBrownedOut
              ? ACTION_NAMES.BROWN_OUT_END
              : ACTION_NAMES.BROWN_OUT
          }
          gamePiece="null"
          location="null"
          label={context.isBrownedOut ? "ROBOT RESTARTED" : "BROWNOUT"}
          onClick={() => {
            toast.error(
              context.isBrownedOut
                ? "Robot has restarted. Screen enabled!"
                : "Robot has stopped. Screen disabled!"
            );
            context.setIsBrownedOut(!context.isBrownedOut);
          }}
        />

        <ContinueButton
          // disabled={currentAction === "" || context.isTimerRunning}
          onClick={() => {
            screenContext.nextScreen();
          }}
          shouldShowIcon
        />
      </div>
    </>
  );
}
