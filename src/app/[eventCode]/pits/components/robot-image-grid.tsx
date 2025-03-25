"use client";

import React from "react";
import PitScoutCard from "~/app/[eventCode]/pits/components/pit-scout-card";
import { TeamTypeWithImages } from "~/server/http/frc-events";

const RobotImageGrid = ({
  teams,
  eventCode,
}: {
  teams: TeamTypeWithImages[];
  eventCode: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-8">
      {teams &&
        teams.map((team) => {
          return (
            <PitScoutCard
              key={`pit-scout-card-${team.teamNumber}`}
              team={team}
              eventCode={eventCode}
            />
          );
        })}
    </div>
  );
};

export default RobotImageGrid;
