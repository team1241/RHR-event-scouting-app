"use client";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import React, { useContext, useEffect, useState } from "react";
import { MATCH_STATES } from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { cn } from "~/lib/utils";

const CountdownTimer = () => {
  const { matchState } = useContext(ScoutDataContext);

  const [seconds, setSeconds] = useState(0);
  const minutesRemaining = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = seconds % 60;

  useEffect(() => {
    if (matchState === MATCH_STATES.PRE_START) return;
    if (matchState === MATCH_STATES.FINISHED) return;
    if (matchState === MATCH_STATES.AUTO) setSeconds(15);
    if (matchState === MATCH_STATES.TELEOP) setSeconds(135);

    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [matchState]);

  if (
    !seconds ||
    seconds <= 0 ||
    matchState === MATCH_STATES.PRE_START ||
    matchState === MATCH_STATES.FINISHED
  )
    return null;

  return (
    <div>
      <NumberFlowGroup>
        <div
          className={cn(
            "flex flex-row justify-between font-bold text-xl",
            minutesRemaining < 1 ? "min-w-24" : "min-w-36",
            secondsRemaining < 10 &&
              "animate-pulse bg-yellow-500 rounded-sm py-0.5 px-2 text-black"
          )}
        >
          <p>{matchState[0].toUpperCase().concat(matchState.substring(1))}:</p>
          <div className="flex flex-row gap-2">
            {minutesRemaining >= 1 && (
              <NumberFlow value={minutesRemaining} trend={-1} suffix="m" />
            )}
            <NumberFlow value={secondsRemaining % 60} trend={-1} suffix="s" />
          </div>
        </div>
      </NumberFlowGroup>
    </div>
  );
};

export default CountdownTimer;
