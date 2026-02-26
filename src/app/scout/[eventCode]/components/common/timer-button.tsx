"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScoutActionButton from "./scout-action-button";
import { ScoutAction } from "~/app/scout/[eventCode]/context/data-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { ScoutDataContext } from "../../context";
import { formatISO } from "date-fns";
import { LOCAL_STORAGE_KEYS } from "../../constants";

type TimerButtonProps = React.ComponentProps<typeof ScoutActionButton> & {
  timerLabel?: string;
  endActionName?: string;
  allowStopOnClick?: boolean;
  popoverSide?: React.ComponentProps<typeof PopoverContent>["side"];
  popoverAlign?: React.ComponentProps<typeof PopoverContent>["align"];
  popoverSideOffset?: number;
  popoverAlignOffset?: number;
  popoverClassName?: string;
  triggerClassName?: string;
  onStart?: () => void;
  onStop?: () => void;
  onElapsedSecondsChange?: (elapsedSeconds: number) => void;
  getShouldLogAction?: (isRunning: boolean) => boolean;
  renderPopoverContent?: (args: {
    elapsedSeconds: number;
    stopTimer: () => void;
  }) => React.ReactNode;
  shouldForceStop?: boolean;
  logOnForceStop?: boolean;
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
  endActionName,
  onStart,
  onStop,
  onElapsedSecondsChange,
  getShouldLogAction,
  renderPopoverContent,
  shouldForceStop,
  logOnForceStop = false,
  popoverSide,
  popoverAlign,
  popoverSideOffset,
  popoverAlignOffset,
  popoverClassName,
  triggerClassName,
  ...buttonProps
}: TimerButtonProps) {
  const scoutDataContext = React.useContext(ScoutDataContext);
  const isDisabled = !!buttonProps.disabled;
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

  const getActionExtras = useCallback(() => {
    const baseActionExtras = buttonProps.getActionExtras?.() ?? {};
    if (!isRunning && elapsedSeconds === 0) return baseActionExtras;

    return {
      ...baseActionExtras,
      metadata: {
        ...baseActionExtras.metadata,
        durationSeconds: elapsedSeconds,
      },
    };
  }, [buttonProps, elapsedSeconds, isRunning]);

  const shouldLogAction = getShouldLogAction
    ? getShouldLogAction(isRunning)
    : true;
  const resolvedActionName =
    isRunning && endActionName ? endActionName : buttonProps.actionName;

  const logAction = useCallback(() => {
    const timestamp = formatISO(new Date());
    const actionExtras = getActionExtras();

    scoutDataContext.setActions((prevActions) => {
      const updatedActionsList = [
        ...prevActions,
        {
          scoutId: scoutDataContext.scouterDetails.id.toString(),
          matchNumber: scoutDataContext.matchNumber,
          teamNumber: scoutDataContext.teamToScout!,
          eventCode: scoutDataContext.matchNumber,
          hasUndo: scoutDataContext.undoOccurred,
          wasDefended: scoutDataContext.wasDefended,
          actionName: resolvedActionName,
          gamePiece: buttonProps.gamePiece,
          location: buttonProps.location,
          isAuto: buttonProps.isAuto ?? false,
          timestamp,
          ...actionExtras,
        } as ScoutAction,
      ];
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACTIONS,
        JSON.stringify(updatedActionsList),
      );
      return updatedActionsList;
    });
    scoutDataContext.setUndoOccurred(false);
  }, [
    buttonProps.gamePiece,
    buttonProps.isAuto,
    buttonProps.location,
    getActionExtras,
    resolvedActionName,
    scoutDataContext,
  ]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setIsTimerVisible(false);
    onStop?.();
  }, [onStop]);

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
    if (logOnForceStop && shouldLogAction) {
      logAction();
    }
    stopTimer();
  }, [
    isRunning,
    logAction,
    logOnForceStop,
    shouldForceStop,
    shouldLogAction,
    stopTimer,
  ]);

  const handleClick = () => {
    if (isDisabled) return;

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
      open={isDisabled ? false : isTimerVisible}
      onOpenChange={(nextOpen) => {
        if (isDisabled) return;
        if (nextOpen) {
          setIsTimerVisible(true);
        }
      }}
    >
      <PopoverTrigger asChild disabled={isDisabled}>
        <span className={cn("inline-flex", triggerClassName)}>
          <ScoutActionButton
            {...buttonProps}
            actionName={resolvedActionName}
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
