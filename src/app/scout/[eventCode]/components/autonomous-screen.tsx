"use client";

import { formatISO } from "date-fns";
import { ACTION_NAMES, MATCH_STATES } from "../constants";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import PageHeading from "~/components/common/page-heading";
import UndoActionButton from "./common/undo-action-button";
import MatchScoutingLayout from "~/app/scout/[eventCode]/components/common/match-scouting-layout";
import { useContext, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";

export default function AutonomousScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [isAutoStopped, setAutoStopped] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Autonomous</PageHeading>
          <UndoActionButton
            className="text-2xl font-bold w-36 h-16 dark:bg-red-600"
            onClick={() => {
              setAutoStopped(false);
            }}
          />
        </div>
      </div>
      <MatchScoutingLayout isDisabled={isAutoStopped} />
      <div className="flex flex-row justify-between">
        <ScoutActionButton
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={ACTION_NAMES.A_STOP}
          gamePiece="null"
          location="null"
          label="A-STOP"
          isAuto
          onClick={() => {
            setAutoStopped(true);
          }}
        />
        <ContinueButton
          onClick={() => {
            if (context.actions.length > 1) {
              context.actions.splice(1, 0, {
                scoutId: context.scouterDetails.id.toString(),
                matchNumber: context.matchNumber,
                teamNumber: Number(context.teamToScout!),
                eventCode: context.matchNumber,
                hasUndo: false,
                wasDefended: false,
                actionName: ACTION_NAMES.LEAVE,
                gamePiece: "None",
                location: "None",
                isAuto: true,
                timestamp: context.actions[1].timestamp,
              });
            }
            context.actions.push({
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
            });
            screenContext.nextScreen();
            context.setMatchState(MATCH_STATES.TELEOP);
            context.actions.push({
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
            });
          }}
          disabled={context.isTimerRunning}
        />
      </div>
    </>
  );
}
