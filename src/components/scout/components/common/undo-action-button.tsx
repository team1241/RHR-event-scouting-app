"use client";

import { Undo } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";
import {
  ACTION_NAMES,
  GAME_PIECES,
  LOCAL_STORAGE_KEYS,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/components/scout/context";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const UndoActionButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const {
    actions,
    setActions,
    setUndoOccurred,
    gamePieceState,
    setGamePieceState,
    setHasLeftStartingLine,
    setIsAutoStopped,
  } = useContext(ScoutDataContext);

  const onUndoClick = () => {
    if (actions.length === 0) return;
    const actionsCopy = [...actions];
    const lastAction = actionsCopy.pop();
    if (lastAction?.gamePiece === GAME_PIECES.CORAL) {
      const newCoralCount =
        lastAction.actionName === ACTION_NAMES.INTAKE ? 0 : 1;
      lastAction.actionName;
      setGamePieceState([
        { type: GAME_PIECES.CORAL, count: newCoralCount },
        gamePieceState[1],
      ]);
    } else if (lastAction?.gamePiece === GAME_PIECES.ALGAE) {
      const newAlgaeCount =
        lastAction.actionName === ACTION_NAMES.INTAKE ? 0 : 1;
      setGamePieceState([
        gamePieceState[0],
        { type: GAME_PIECES.ALGAE, count: newAlgaeCount },
      ]);
    }

    if (lastAction?.actionName === ACTION_NAMES.LEAVE) {
      setHasLeftStartingLine(false);
    }

    if (lastAction?.actionName === ACTION_NAMES.A_STOP) {
      setIsAutoStopped(false);
    }

    setActions(actionsCopy);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACTIONS,
      JSON.stringify(actionsCopy)
    );
    setUndoOccurred(true);
    toast.error("PREVIOUS ACTION SUCCESSFULLY UNDONE");
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={onUndoClick}
      variant={"custom"}
      className={cn("text-white font-bold", className)}
    >
      UNDO
      <Undo className="!size-6" />
    </Button>
  );
};

export default UndoActionButton;
