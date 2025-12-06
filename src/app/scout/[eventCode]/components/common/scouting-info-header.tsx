"use client";

import React, { useContext } from "react";
import CountdownTimer from "~/app/scout/[eventCode]/components/common/countdown-timer";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";
import { cn } from "~/lib/utils";

const ScoutingInfoHeader = () => {
  const { matchNumber, teamToScout, allianceColour, isAlternateScout } =
    useContext(ScoutDataContext);

  const getTeamToScoutColour = () => {
    if (!allianceColour) return "bg-yellow-500";

    return allianceColour === "red" ? "bg-red-500" : "bg-blue-500";
  };

  return (
    <div className="w-full h-9 flex justify-between items-center">
      <p
        className={cn(
          "text-white rounded-sm bg-green-700 py-1 px-2 font-semibold",
          !matchNumber && "bg-yellow-500 text-black "
        )}
      >
        {matchNumber || "Match not set"}
      </p>
      <CountdownTimer />
      {!isAlternateScout ? (
        <p
          className={cn(
            "rounded-sm py-1 px-2 font-bold text-center",
            getTeamToScoutColour(),
            !teamToScout ? "text-black" : "text-white w-24"
          )}
        >
          {teamToScout || "Team not set"}
        </p>
      ) : (
        <p className="font-semibold bg-teal-700 rounded-sm py-1 px-2">
          Human player scout
        </p>
      )}
    </div>
  );
};

export default ScoutingInfoHeader;
