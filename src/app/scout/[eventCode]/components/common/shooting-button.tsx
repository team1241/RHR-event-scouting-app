"use client";

import { useContext, type ComponentProps } from "react";
import ScoutActionButton from "./scout-action-button";
import {
  ACTION_NAMES,
  ALLIANCE_COLOURS,
  FIELD_ORIENTATIONS,
  SHOOTING_ACCURACY,
} from "~/app/scout/[eventCode]/constants";
import TimerButton from "./timer-button";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";

export type ShootingZone = "zone1" | "zone2" | "zone3";

type ShootingButtonProps = Omit<
  ComponentProps<typeof TimerButton>,
  | "onClick"
  | "actionName"
  | "disabled"
  | "allowStopOnClick"
  | "timerLabel"
  | "getShouldLogAction"
  | "popoverSide"
  | "popoverAlign"
  | "popoverSideOffset"
  | "popoverAlignOffset"
  | "popoverClassName"
  | "renderPopoverContent"
> & {
  zone: ShootingZone;
  activeShootingZone: ShootingZone | null;
  setActiveShootingZone: (zone: ShootingZone | null) => void;
};

const formatAccuracyLabel = (key: string) =>
  `${key.charAt(0)}${key.slice(1).toLowerCase()}`;

export default function ShootingButton({
  zone,
  activeShootingZone,
  setActiveShootingZone,
  ...props
}: ShootingButtonProps) {
  const context = useContext(ScoutDataContext);
  const isActive = activeShootingZone === zone;
  const isDisabled = activeShootingZone !== null && !isActive;

  const getPopoverSide = () => {
    if (context.allianceColour === ALLIANCE_COLOURS.RED) {
      return context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
        ? "right"
        : "left";
    }
    return context.uiOrientation === FIELD_ORIENTATIONS.DEFAULT
      ? "left"
      : "right";
  };

  return (
    <TimerButton
      {...props}
      timerLabel="SHOOTING..."
      actionName={ACTION_NAMES.SHOOTING}
      allowStopOnClick={false}
      disabled={isDisabled}
      getShouldLogAction={(isRunning) => !isRunning}
      popoverSide={getPopoverSide()}
      popoverAlign="center"
      popoverSideOffset={8}
      popoverAlignOffset={100}
      popoverClassName="w-[350px]"
      renderPopoverContent={({ elapsedSeconds, stopTimer }) => {
        const accuracyOptions = Object.entries(SHOOTING_ACCURACY).map(
          ([label, value]) => ({
            label: formatAccuracyLabel(label),
            value,
            percentLabel: `${Math.round(value * 100)}%`,
          }),
        );

        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            {accuracyOptions.map((option) => (
              <ScoutActionButton
                key={option.label}
                actionName={ACTION_NAMES.SHOOTING_END}
                gamePiece={props.gamePiece}
                location={props.location}
                isAuto={props.isAuto}
                onClick={() => {
                  stopTimer();
                  setActiveShootingZone(null);
                }}
                label={
                  <span className="flex flex-col items-center leading-tight">
                    <span className="uppercase text-lg">{option.label}</span>
                    <span className="text-sm opacity-80">
                      ({option.percentLabel})
                    </span>
                  </span>
                }
                className="h-12 px-4 text-sm"
                getActionExtras={() => ({
                  metadata: {
                    accuracy: option.value,
                    durationSeconds: elapsedSeconds,
                  },
                })}
              />
            ))}
          </div>
        );
      }}
      onClick={() => {
        if (!isActive) {
          setActiveShootingZone(zone);
        }
      }}
    />
  );
}
