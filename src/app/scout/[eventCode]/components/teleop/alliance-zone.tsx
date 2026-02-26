"use client";

import { useContext, useEffect, useState } from "react";
import FieldImage from "~/app/scout/[eventCode]/components/common/field-image";
import ScoutActionButton from "~/app/scout/[eventCode]/components/common/scout-action-button";
import ZoneCrossingButtons from "~/app/scout/[eventCode]/components/common/zone-crossing-buttons";
import {
  ACTION_NAMES,
  GAME_PIECE,
  LOCATIONS,
  SHOOTING_ACCURACY,
} from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { getFlexDirection } from "~/app/scout/[eventCode]/utils";
import { cn } from "~/lib/utils";

const formatAccuracyLabel = (key: string) =>
  `${key.charAt(0)}${key.slice(1).toLowerCase()}`;

const ACCURACY_BUTTON_CLASSES: Record<string, string> = {
  ALL: "bg-emerald-600",
  MOST: "bg-lime-600",
  HALF: "bg-amber-500 text-black",
  FEW: "bg-orange-600",
  NONE: "bg-red-600",
};

const formatElapsed = (elapsedSeconds: number) => {
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function AllianceZoneTeleop() {
  const [isShooting, setIsShooting] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const context = useContext(ScoutDataContext);

  const { row } = getFlexDirection(
    context.uiOrientation,
    context.allianceColour,
  );
  const accuracyOptions = Object.entries(SHOOTING_ACCURACY).map(
    ([label, value]) => ({
      key: label,
      label: formatAccuracyLabel(label),
      value,
      percentLabel: `${Math.round(value * 100)}%`,
    }),
  );

  useEffect(() => {
    if (!isShooting) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isShooting]);

  return (
    <FieldImage imageSize="100%" fieldSize="half">
      <div className={cn("flex w-full h-full", row)}>
        <div
          className={cn(
            "h-full flex flex-col gap-4 py-5",
            row === "flex-row" ? "pl-[74px]" : "pr-[74px]",
          )}
        >
          <div className="relative h-full w-full">
            <ScoutActionButton
              actionName={ACTION_NAMES.SHOOTING}
              gamePiece={GAME_PIECE.FUEL}
              location={LOCATIONS.ALLIANCE_ZONE}
              label={isShooting ? "SHOOTING" : "SHOOT"}
              className="h-full w-full dark:bg-yellow-500/80 text-2xl"
              onClick={() => {
                setIsShooting(true);
              }}
              disabled={isShooting}
              shouldBeHidden={false}
            />
          </div>
          <ScoutActionButton
            actionName={ACTION_NAMES.DUMP_FUEL}
            gamePiece={GAME_PIECE.FUEL}
            location={LOCATIONS.ALLIANCE_ZONE}
            label="DUMP FUEL"
            className="h-16 w-[260px]"
          />
        </div>
        <ZoneCrossingButtons type="alliance" />
        <div
          className={cn(
            "data-[visible=false]:hidden data-[visible=true]:visible h-full flex flex-col justify-center",
            row === "flex-row" ? "ml-[15px]" : "mr-[15px]",
          )}
          data-visible={isShooting}
        >
          <div className="w-[240px] bg-slate-800 p-4 rounded-lg">
            <div className="text-center text-xl font-mono font-semibold text-white mb-3">
              {formatElapsed(elapsedSeconds)}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {accuracyOptions.map((option) => (
                <ScoutActionButton
                  key={option.key}
                  actionName={ACTION_NAMES.SHOOTING_END}
                  gamePiece={GAME_PIECE.FUEL}
                  location={LOCATIONS.ALLIANCE_ZONE}
                  onClick={() => {
                    setIsShooting(false);
                    setElapsedSeconds(0);
                  }}
                  label={
                    <span className="flex flex-col items-center leading-tight">
                      <span className="uppercase text-lg">{option.label}</span>
                      <span className="text-sm opacity-80">
                        ({option.percentLabel})
                      </span>
                    </span>
                  }
                  className={cn(
                    "h-12 px-4 text-sm",
                    ACCURACY_BUTTON_CLASSES[option.key],
                  )}
                  getActionExtras={() => ({
                    metadata: {
                      accuracy: option.value,
                      durationSeconds: elapsedSeconds,
                    },
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FieldImage>
  );
}
