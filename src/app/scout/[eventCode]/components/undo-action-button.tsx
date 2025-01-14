"use client";

import React, { useContext } from "react";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const UndoActionButton = ({ className }: { className?: string }) => {
  const { actions, setActions, setUndoOccurred } = useContext(ScoutDataContext);

  const onUndoClick = () => {
    if (actions.length === 0) return;
    const actionsCopy = [...actions];
    actionsCopy.pop();
    setActions(actionsCopy);
    setUndoOccurred(true);
  };

  return (
    <Button
      onClick={onUndoClick}
      variant={"custom"}
      className={cn("text-white font-bold", className)}
    >
      Undo
    </Button>
  );
};

export default UndoActionButton;
