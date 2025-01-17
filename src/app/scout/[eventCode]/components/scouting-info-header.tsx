"use client";

import React, { useContext } from "react";
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
    <div className="w-full h-8 flex justify-between items-center">
      <p className="font-semibold">
        Match number:{" "}
        <span
          className={cn(
            "text-white rounded-sm bg-green-700 py-1 px-2",
            !matchNumber && "bg-yellow-500 text-black "
          )}
        >
          {matchNumber || "Not set"}
        </span>
      </p>
      {!isAlternateScout ? (
        <p className="font-semibold">
          Team to scout:{" "}
          <span
            className={cn(
              "rounded-sm py-1 px-2",
              getTeamToScoutColour(),
              !teamToScout ? "text-black" : "text-white"
            )}
          >
            {teamToScout || "Not set"}
          </span>
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
