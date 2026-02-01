"use client";

import React, { useEffect, useMemo, useState } from "react";
import ScoutActionButton from "./scout-action-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type TimerButtonProps = React.ComponentProps<typeof ScoutActionButton> & {
  timerLabel?: string;
  allowStopOnClick?: boolean;
  popoverSide?: React.ComponentProps<typeof PopoverContent>["side"];
  popoverAlign?: React.ComponentProps<typeof PopoverContent>["align"];
  popoverSideOffset?: number;
  popoverAlignOffset?: number;
  popoverClassName?: string;
  onStart?: () => void;
  onStop?: () => void;
  onElapsedSecondsChange?: (elapsedSeconds: number) => void;
  getShouldLogAction?: (isRunning: boolean) => boolean;
  renderPopoverContent?: (args: {
    elapsedSeconds: number;
    stopTimer: () => void;
  }) => React.ReactNode;
  shouldForceStop?: boolean;
};

const formatElapsed = (elapsedSeconds: number) => {
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function TimerButton({
  onClick,
  allowStopOnClick = true,
  timerLabel,
  onStart,
  onStop,
  onElapsedSecondsChange,
  getShouldLogAction,
  renderPopoverContent,
  shouldForceStop,
  popoverSide,
  popoverAlign,
  popoverSideOffset,
  popoverAlignOffset,
  popoverClassName,
  ...buttonProps
}: TimerButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const resolvedButtonLabel = useMemo(
    () => timerLabel ?? buttonProps.label,
    [buttonProps.label, timerLabel],
  );
  const displayButtonLabel = isRunning
    ? resolvedButtonLabel
    : buttonProps.label;

  const getActionExtras = () => {
    if (!isRunning && elapsedSeconds === 0) return {};
    return { metadata: { durationSeconds: elapsedSeconds } };
  };

  const shouldLogAction = getShouldLogAction
    ? getShouldLogAction(isRunning)
    : true;

  const stopTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setIsTimerVisible(false);
    onStop?.();
  };

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    onElapsedSecondsChange?.(elapsedSeconds);
  }, [elapsedSeconds, onElapsedSecondsChange]);

  useEffect(() => {
    if (!shouldForceStop || !isRunning) return;
    stopTimer();
  }, [shouldForceStop, isRunning]);

  const handleClick = () => {
    if (isRunning) {
      if (allowStopOnClick) {
        stopTimer();
        if (onClick) {
          onClick();
        }
      } else {
        setIsTimerVisible(true);
      }
      return;
    }

    setIsTimerVisible(true);
    setIsRunning(true);
    onStart?.();
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
            getActionExtras={getActionExtras}
            shouldLogAction={shouldLogAction}
          />
        </span>
      </PopoverTrigger>
      {isTimerVisible && (
        <PopoverContent
          align={popoverAlign ?? "center"}
          alignOffset={popoverAlignOffset ?? 100}
          side={popoverSide ?? "top"}
          sideOffset={popoverSideOffset ?? 8}
          className={cn(
            "w-auto px-3 py-2 text-base font-semibold",
            popoverClassName,
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-lg">
              {formatElapsed(elapsedSeconds)}
            </span>
            {renderPopoverContent?.({
              elapsedSeconds,
              stopTimer,
            })}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
