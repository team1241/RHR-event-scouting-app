"use client";

import PageHeading from "~/components/common/page-heading";
import FieldImage from "./common/field-image";
import { useContext, useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import ScoutActionButton from "./common/scout-action-button";
import {
  ACTION_NAMES,
  GAME_PIECE,
  LOCATIONS,
} from "~/app/scout/[eventCode]/constants";
import ContinueButton from "./common/continue-button";
import BackButton from "./common/back-button";
import UndoActionButton from "./common/undo-action-button";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export default function EndgameScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [currentAction, setCurrentAction] = useState<string>("");
  const [positionSelected, setPositionSelected] = useState<string>("");

  useEffect(() => {
    setCurrentAction(context.previousEndgameAction.actionMessage);
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
              setPositionSelected("");
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
        <p className="text-2xl font-bold mt-4 ml-[5rem]">{`Most Recent: ${currentAction}`}</p>
      </div>

      <FieldImage
        imageSize="100%"
        fieldSize="half"
        imageUrl="https://rb4alqiu9a.ufs.sh/f/42uJu9obYfa7DPux5fw9xVHyaSv7GgruA8IWmkXtdzQM3FTh"
      >
        <div className="flex h-full">
          <div className="flex flex-col items-center justify-evenly h-full mt-2 w-2/5">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECE.NONE}
              location={LOCATIONS.TOWER.L3}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: positionSelected,
                  actionMessage: "Successfully Climbed L3",
                });

                toast.error("Robot climbed L3!");
                setCurrentAction("Successfully Climbed L3");
                setPositionSelected("");
              }}
              disabled={context.isBrownedOut || !positionSelected}
              label="Level 3"
              shouldBeHidden={false}
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECE.NONE}
              location={LOCATIONS.TOWER.L2}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: positionSelected,
                  actionMessage: "Successfully Climbed L2",
                });

                toast.error("Robot climbed L2!");
                setCurrentAction("Successfully Climbed L2");
                setPositionSelected("");
              }}
              disabled={context.isBrownedOut || !positionSelected}
              label="Level 2"
              shouldBeHidden={false}
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECE.NONE}
              location={LOCATIONS.TOWER.L1}
              className={"mb-1 h-16 w-40 font-bold text-xl bg-blue-500"}
              onClick={() => {
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: positionSelected,
                  actionMessage: "Successfully Climbed L1",
                });

                toast.error("Robot climbed L1!");
                setCurrentAction("Successfully Climbed L1");
                setPositionSelected("");
              }}
              disabled={context.isBrownedOut || !positionSelected}
              label="Level 1"
              shouldBeHidden={false}
            />
          </div>

          <div className="flex h-full gap-4 w-3/5 ml-16 my-1">
            <Button
              className={cn(
                "h-full w-32 font-bold text-xl !bg-green-700/60 !text-white",
                positionSelected === LOCATIONS.TOWER.LEFT &&
                  "border-2 border-white",
              )}
              onClick={() => {
                setPositionSelected(LOCATIONS.TOWER.LEFT);
              }}
              disabled={!!currentAction}
            >
              Left
            </Button>
            <Button
              className={cn(
                "h-full w-32 font-bold text-xl !bg-orange-700/60 !text-white",
                positionSelected === LOCATIONS.TOWER.CENTER &&
                  "border-2 border-white",
              )}
              onClick={() => {
                setPositionSelected(LOCATIONS.TOWER.CENTER);
              }}
              disabled={!!currentAction}
            >
              Center
            </Button>
            <Button
              className={cn(
                "h-full w-32 font-bold text-xl !bg-purple-700/60 !text-white",
                positionSelected === LOCATIONS.TOWER.RIGHT &&
                  "border-2 border-white",
              )}
              onClick={() => {
                setPositionSelected(LOCATIONS.TOWER.RIGHT);
              }}
              disabled={!!currentAction}
            >
              Right
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
                : "Robot has stopped. Screen disabled!",
            );
            context.setIsBrownedOut(!context.isBrownedOut);
          }}
        />

        <ContinueButton
          onClick={() => {
            screenContext.nextScreen();
          }}
          shouldShowIcon
        />
      </div>
    </>
  );
}
