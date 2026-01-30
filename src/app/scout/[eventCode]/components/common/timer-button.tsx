"use client";

import React, { useEffect, useMemo, useState } from "react";
import ScoutActionButton from "./scout-action-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export enum TimerButtonType {
  Shooting = "shooting",
  Feeding = "feeding",
}

type TimerButtonProps = React.ComponentProps<typeof ScoutActionButton> & {
  type: TimerButtonType;
  timerLabel?: string;
};

const formatElapsed = (elapsedSeconds: number) => {
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getDefaultButtonLabel = (type: TimerButtonType) => {
  switch (type) {
    case TimerButtonType.Feeding:
      return "FEEDING...";
    case TimerButtonType.Shooting:
      return "SHOOTING...";
  }
};

export default function TimerButton({
  type,
  onClick,
  ...buttonProps
}: TimerButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const resolvedButtonLabel = useMemo(
    () => getDefaultButtonLabel(type),
    [type],
  );
  const displayButtonLabel = isRunning
    ? resolvedButtonLabel
    : buttonProps.label;

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleClick = () => {
    setIsRunning((prevRunning) => {
      if (prevRunning) {
        setElapsedSeconds(0);
        setIsTimerVisible(false);
        return false;
      }

      setIsTimerVisible(true);
      return true;
    });
    if (onClick) {
      onClick();
    }
  };

  return (
    <Popover
      open={isTimerVisible}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setIsTimerVisible(true);
        }
      }}
    >
      <PopoverTrigger asChild>
        <span className="inline-flex">
          <ScoutActionButton
            {...buttonProps}
            label={displayButtonLabel}
            onClick={handleClick}
          />
        </span>
      </PopoverTrigger>
      {isTimerVisible && (
        <PopoverContent
          align="center"
          side="top"
          sideOffset={8}
          className="w-auto px-3 py-2 text-lg font-semibold"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono">{formatElapsed(elapsedSeconds)}</span>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
