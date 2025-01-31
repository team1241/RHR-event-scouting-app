"use client";

import { Undo } from "lucide-react";
import React, { useContext } from "react";
import { LOCAL_STORAGE_KEYS } from "~/app/scout/[eventCode]/constants";
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
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACTIONS,
      JSON.stringify(actionsCopy)
    );
    setUndoOccurred(true);
  };

  return (
    <Button
      onClick={onUndoClick}
      variant={"custom"}
      className={cn("text-white font-bold", className)}
    >
      UNDO
      <Undo className="!size-6"/>
    </Button>
  );
};

export default UndoActionButton;
