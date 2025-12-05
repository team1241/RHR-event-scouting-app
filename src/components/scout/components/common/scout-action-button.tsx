"use client";

import React, { useContext } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ScoutDataContext } from "../../context";
import {
  ALLIANCE_COLOURS,
  LOCAL_STORAGE_KEYS,
} from "~/app/scout/[eventCode]/constants";
import { formatISO } from "date-fns";
import { ScoutAction } from "~/components/scout/context/data-context";

const ScoutActionButton = ({
  actionName,
  gamePiece,
  location,
  isAuto = false,
  className,
  label,
  onClick,
  disabled,
  shouldBeHidden = true,
}: {
  actionName: string;
  gamePiece?: string;
  location: string;
  isAuto?: boolean;
  className?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  shouldBeHidden?: boolean;
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
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACTIONS,
      JSON.stringify(updatedActionsList)
    );
    scoutDataContext.setUndoOccurred(false);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={onActionClick}
      variant={"custom"}
      className={cn(
        "text-white font-bold",
        isBlueAlliance ? "bg-blue-300/50" : "bg-red-300/50",
        scoutDataContext.isDefending ||
          scoutDataContext.isAutoStopped ||
          scoutDataContext.isBrownedOut ||
          !shouldBeHidden
          ? "disabled:opacity-20"
          : "disabled:opacity-0",
        className
      )}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default ScoutActionButton;
