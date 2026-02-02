"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import BackButton from "~/app/scout/[eventCode]/components/common/back-button";
import ContinueButton from "~/app/scout/[eventCode]/components/common/continue-button";
import { useContext, useState } from "react";
import { cn } from "~/lib/utils";
import {
  ScoutDataContext,
  ScoutScreenContext,
} from "~/app/scout/[eventCode]/context";

export default function BallScoutSetup() {
  const [redHumanPlayerSelected, setRedHumanPlayerSelected] = useState("");
  const [blueHumanPlayerSelected, setBlueHumanPlayerSelected] = useState("");
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const matchNumber = context.matchNumber.match(/\d+/g)![0];
  const teamsInCurrentMatch = context.matchSchedule[
    parseInt(matchNumber) - 1
  ].teams.map((team) => team.teamNumber);

  const updateTeamNumber = (teamNumber: number, allianceColour: string) => {
    if (context.alternateScoutData && context.setAlternateScoutData) {
      context.setAlternateScoutData({
        ...context!.alternateScoutData,
        setup: {
          ...context!.alternateScoutData.setup,
          [`${allianceColour}TeamNumber`]: teamNumber,
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <PageHeading>Team Human Player</PageHeading>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">Red Alliance</h1>
          <Button
            variant={"redTeam"}
            id="redOne"
            className={cn(
              "h-20 w-72 text-2xl",
              redHumanPlayerSelected === "Red1" &&
                "dark:ring-yellow-400 ring-2 ring-offset-4",
            )}
            onClick={() => {
              setRedHumanPlayerSelected("Red1");
              updateTeamNumber(teamsInCurrentMatch[0], "red");
            }}
          >
            {teamsInCurrentMatch[0]}
          </Button>
          <Button
            variant={"redTeam"}
            id="redTwo"
            className={cn(
              "h-20 text-2xl",
              redHumanPlayerSelected === "red2" &&
                "dark:ring-2 ring-yellow-400 ring-offset-4",
            )}
            onClick={() => {
              setRedHumanPlayerSelected("red2");
              updateTeamNumber(teamsInCurrentMatch[1], "red");
            }}
          >
            {teamsInCurrentMatch[1]}
          </Button>
          <Button
            variant={"redTeam"}
            id="redThree"
            className={cn(
              "h-20 text-2xl",
              redHumanPlayerSelected === "red3" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4",
            )}
            onClick={() => {
              setRedHumanPlayerSelected("red3");
              updateTeamNumber(teamsInCurrentMatch[2], "red");
            }}
          >
            {teamsInCurrentMatch[2]}
          </Button>
        </div>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">Blue Alliance</h1>
          <Button
            variant={"blueTeam"}
            id="blueOne"
            className={cn(
              "h-20 w-72 text-2xl",
              blueHumanPlayerSelected === "blue1" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4",
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue1");
              updateTeamNumber(teamsInCurrentMatch[3], "blue");
            }}
          >
            {" "}
            {teamsInCurrentMatch[3]}
          </Button>
          <Button
            variant={"blueTeam"}
            id="blueTwo"
            className={cn(
              "h-20 text-2xl",
              blueHumanPlayerSelected === "blue2" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4",
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue2");
              updateTeamNumber(teamsInCurrentMatch[4], "blue");
            }}
          >
            {teamsInCurrentMatch[4]}
          </Button>
          <Button
            variant={"blueTeam"}
            id="blueThree"
            className={cn(
              "h-20 text-2xl",
              blueHumanPlayerSelected === "blue3" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4",
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue3");
              updateTeamNumber(teamsInCurrentMatch[5], "blue");
            }}
          >
            {teamsInCurrentMatch[5]}
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between my-20">
        <BackButton
          onClick={() => screenContext.goToScreen("match-selection")}
        />
        <ContinueButton
          disabled={
            redHumanPlayerSelected === "" || blueHumanPlayerSelected === ""
          }
          onClick={() => screenContext.nextScreen()}
          shouldShowIcon
        />
      </div>
    </>
  );
}
