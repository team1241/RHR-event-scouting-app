"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import MatchSelectionForm from "./common/match-selection-form";
import { useContext, useState } from "react";
import { MoveRightIcon } from "lucide-react";
import { ScoutDataContext } from "../context";

export default function MatchSelectionScreen() {
  const [isTeamSelectedEnabled, setTeamSelectedEnabled] = useState(false);
  const context = useContext(ScoutDataContext);
  console.log(context.currentMatch);
  return (
    <>
      {/* Match selection */}
      <PageHeading>Match Selection</PageHeading>

      <div className="flex justify-between items-center gap-4">
        <MatchSelectionForm setTeamSelectedEnabled={setTeamSelectedEnabled} />

        <div className="flex flex-col items-center justify-end gap-2">
          <p className="text-2xl font-bold self-start">Select Position</p>
          <div className="flex flex-row justify-end gap-2">
            <div className="flex flex-col space-y-3">
              <Button
                variant={"blueTeam"}
                size={"team"}
                id="blueOne"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue1"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 1
              </Button>
              <Button
                variant={"blueTeam"}
                size={"team"}
                id="blueTwo"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue2"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 2
              </Button>
              <Button
                variant={"blueTeam"}
                size={"team"}
                id="blueThree"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue3"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 3
              </Button>
            </div>
            <div className="flex flex-col space-y-3">
              <Button
                variant={"redTeam"}
                size={"team"}
                id="redOne"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red1"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 1
              </Button>
              <Button
                variant={"redTeam"}
                size={"team"}
                id="redTwo"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red2"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 2
              </Button>
              <Button
                variant={"redTeam"}
                size={"team"}
                id="redThree"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red3"
                  );
                  context.setTeamToScout(team?.teamNumber);
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 3
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full h-16 mt-1 !bg-teal-500 font-bold"
              disabled={!isTeamSelectedEnabled}
            >
              Ball Scout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-16 justify-between items-center">
        <p className="text-2xl">{`Team Scouted: ${context.teamToScout}`}</p>
        <Button
          className="!w-64"
          variant={"proceed"}
          size={"proceed"}
          disabled={context.teamToScout === undefined}
        >
          Continue
          <MoveRightIcon> </MoveRightIcon>
        </Button>
      </div>
    </>
  );
}
