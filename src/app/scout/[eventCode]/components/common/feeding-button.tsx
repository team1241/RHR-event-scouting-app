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
> & { feedingEndZone: string };

export default function FeedingButton(props: FeedingButtonProps) {
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
        scoutDataContext.setIsFeeding(!scoutDataContext.isFeeding);
      }}
    />
  );
}
