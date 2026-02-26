"use client";

import type { ComponentProps } from "react";
import { useContext } from "react";
import { ACTION_NAMES } from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import TimerButton from "./timer-button";

type FeedingButtonProps = Omit<
  ComponentProps<typeof TimerButton>,
  | "onClick"
  | "actionName"
  | "allowStopOnClick"
  | "timerLabel"
  | "onElapsedSecondsChange"
  | "shouldForceStop"
> & {
  feedingEndZone: string;
  onFeedingStateChange?: (isFeeding: boolean) => void;
};

export default function FeedingButton({
  onFeedingStateChange,
  ...props
}: FeedingButtonProps) {
  const scoutDataContext = useContext(ScoutDataContext);

  return (
    <TimerButton
      {...props}
      timerLabel="FEEDING..."
      actionName={
        scoutDataContext.isFeeding
          ? ACTION_NAMES.FEEDING_END
          : ACTION_NAMES.FEEDING
      }
      allowStopOnClick
      shouldForceStop={!scoutDataContext.isFeeding}
      onElapsedSecondsChange={(elapsedSeconds) => {
        scoutDataContext.setFeedingElapsedSeconds(elapsedSeconds);
      }}
      onClick={() => {
        const nextIsFeeding = !scoutDataContext.isFeeding;
        scoutDataContext.setIsFeeding(nextIsFeeding);
        onFeedingStateChange?.(nextIsFeeding);
      }}
    />
  );
}
