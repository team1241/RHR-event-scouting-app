"use client";

import React, { useContext } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ScoutDataContext } from "../context";
import { ALLIANCE_COLOURS } from "../constants";
import { formatISO } from "date-fns";
import { ScoutAction } from "~/app/scout/[eventCode]/context/data-context";

const ScoutActionButton = ({
  actionName,
  gamePiece,
  location,
  isAuto = false,
  className,
}: {
  actionName: string;
  gamePiece: string;
  location: string;
  isAuto?: boolean;
  className?: string;
}) => {
  const scoutDataContext = useContext(ScoutDataContext);
  const isBlueAlliance =
    scoutDataContext.allianceColour === ALLIANCE_COLOURS.BLUE;

  const onActionClick = () => {
    const timestamp = formatISO(new Date());
    const updatedActionsList = [
      ...scoutDataContext.actions,
      {
        scoutId: scoutDataContext.scouterDetails.id.toString(),
        matchNumber: scoutDataContext.matchNumber,
        teamNumber: scoutDataContext.teamToScout!,
        eventCode: scoutDataContext.matchNumber,
        hasUndo: scoutDataContext.undoOccurred,
        wasDefended: scoutDataContext.wasDefended,
        actionName,
        gamePiece,
        location,
        isAuto,
        timestamp,
      } as ScoutAction,
    ];
    scoutDataContext.setActions(updatedActionsList);
    scoutDataContext.setUndoOccurred(false);
    scoutDataContext.setWasDefended(false);
  };

  return (
    <Button
      onClick={onActionClick}
      variant={"custom"}
      className={cn(
        "text-white font-bold",
        !isBlueAlliance ? "bg-blue-300/50" : "bg-red-300/50",
        className
      )}
    >
      ScoutActionButton
    </Button>
  );
};

export default ScoutActionButton;
