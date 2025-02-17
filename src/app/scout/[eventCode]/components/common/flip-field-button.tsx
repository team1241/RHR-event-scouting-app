"use client";

import React, { useContext } from "react";
import {
  FIELD_ORIENTATIONS,
  LOCAL_STORAGE_KEYS,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { Button } from "~/components/ui/button";

const FlipFieldButton = () => {
  const context = useContext(ScoutDataContext);

  const toggleFieldOrientation = () => {
    const newOrientation =
      context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
        ? FIELD_ORIENTATIONS.FLIPPED
        : FIELD_ORIENTATIONS.DEFAULT;

    context.setUiOrientation(newOrientation);

    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEYS.UI_ORIENTATION, newOrientation);
    }
  };

  return (
    <Button
      className="font-bold text-2xl tracking-wide w-64 h-20"
      onClick={toggleFieldOrientation}
    >
      FLIP FIELD
    </Button>
  );
};

export default FlipFieldButton;
