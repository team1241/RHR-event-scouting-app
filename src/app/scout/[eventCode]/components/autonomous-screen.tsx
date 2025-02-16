"use client";

import { formatISO } from "date-fns";
import { ACTION_NAMES, MATCH_STATES } from "../constants";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import PageHeading from "~/components/common/page-heading";
import UndoActionButton from "./common/undo-action-button";
import MatchScoutingLayout from "~/app/scout/[eventCode]/components/common/match-scouting-layout";
import { useContext } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import { cn } from "~/lib/utils";

export default function AutonomousScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row items-center gap-4 w-full">
          <PageHeading>Autonomous</PageHeading>
          <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
          <div className="flex grow justify-end items-center gap-2">
            <ScoutActionButton
              disabled={context.hasLeftStartingLine}
              className={cn(
                "bg-amber-500 flex items-center justify-center text-black font-bold text-xl h-16 w-64 px-4 py-2",
                context.hasLeftStartingLine && "bg-green-400"
              )}
              actionName={ACTION_NAMES.LEAVE}
              label={
                context.hasLeftStartingLine
                  ? "Robot Leave Successful"
                  : "Left starting line?"
              }
              location="null"
              gamePiece="null"
              isAuto
              onClick={() => {
                context.setHasLeftStartingLine(!context.hasLeftStartingLine);
              }}
            />
          </div>
        </div>
      </div>
      <MatchScoutingLayout isDisabled={context.isAutoStopped} />
      <div className="flex flex-row justify-between">
        <ScoutActionButton
          disabled={context.isAutoStopped}
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={ACTION_NAMES.A_STOP}
          gamePiece="null"
          location="null"
          label="A-STOP"
          isAuto
          onClick={() => {
            context.setIsAutoStopped(true);
          }}
        />
        <ContinueButton
          onClick={() => {
            context.actions.push(
              {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.AUTO_COMPLETE,
                gamePiece: "None",
                location: "None",
                isAuto: true,
                timestamp: formatISO(new Date()),
              },
              {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.TELEOP_START,
                gamePiece: "None",
                location: "None",
                isAuto: false,
                timestamp: formatISO(new Date()),
              }
            );
            context.setMatchState(MATCH_STATES.TELEOP);
            screenContext.nextScreen();
          }}
          disabled={context.isTimerRunning}
        />
      </div>
    </>
  );
}
