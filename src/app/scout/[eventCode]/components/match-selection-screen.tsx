"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import MatchSelectionForm from "./common/match-selection-form";
import { useContext, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import { cn } from "~/lib/utils";
import ContinueButton from "./common/continue-button";

export default function MatchSelectionScreen() {
  const context = useContext(ScoutDataContext);
  const [isTeamSelectedEnabled, setTeamSelectedEnabled] = useState(
    !!context.teamToScout
  );
  const [positionSelected, setPositionSelected] = useState(() => {
    const currentMatch = context.matchNumber.match(/\d+/g);
    let value = "";
    if (currentMatch && currentMatch.length > 0) {
      const currentMatchIndex = parseInt(currentMatch[0]) - 1;
      context.matchSchedule[currentMatchIndex].teams.map((team) => {
        if (team.teamNumber === context.teamToScout) {
          value = team.station;
        }
      });
    }
    return value;
  });
  const screenContext = useContext(ScoutScreenContext);
  console.log(positionSelected);
  return (
    <>
      {/* Match selection */}
      <PageHeading>Match Selection</PageHeading>

      <div className="flex justify-between items-center gap-4">
        <MatchSelectionForm setTeamSelectedEnabled={setTeamSelectedEnabled} />
        <div className="flex flex-row mt-16 justify-between items-center">
          {context.teamToScout && (
            <div className="flex flex-col justify-between">
              <p className="text-4xl">{`Team Scouted `}</p>
              <p className="text-4xl">{`${context.teamToScout}`}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <p className="text-2xl font-bold self-start">Select Position</p>
          <div className="flex flex-row justify-end gap-2">
            <div className="flex flex-col space-y-3">
              <Button
                variant={"blueTeam"}
                className={cn(
                  positionSelected === "Blue1" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                size={"team"}
                id="blueOne"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue1"
                  );
                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("blue");
                  setPositionSelected("Blue1");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 1
              </Button>
              <Button
                className={cn(
                  positionSelected === "Blue2" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                variant={"blueTeam"}
                size={"team"}
                id="blueTwo"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue2"
                  );
                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("blue");
                  setPositionSelected("Blue2");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 2
              </Button>
              <Button
                className={cn(
                  positionSelected === "Blue3" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                variant={"blueTeam"}
                size={"team"}
                id="blueThree"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Blue3"
                  );
                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("blue");
                  setPositionSelected("Blue3");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 3
              </Button>
            </div>
            <div className="flex flex-col space-y-3">
              <Button
                className={cn(
                  positionSelected === "Red1" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                variant={"redTeam"}
                size={"team"}
                id="redOne"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red1"
                  );
                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("red");
                  setPositionSelected("Red1");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 1
              </Button>
              <Button
                className={cn(
                  positionSelected === "Red2" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                variant={"redTeam"}
                size={"team"}
                id="redTwo"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red2"
                  );

                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("red");
                  setPositionSelected("Red2");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 2
              </Button>
              <Button
                className={cn(
                  positionSelected === "Red3" &&
                    "dark:ring-2 ring-yellow-400  ring-offset-4"
                )}
                variant={"redTeam"}
                size={"team"}
                id="redThree"
                onClick={() => {
                  const team = context?.currentMatch?.teams.find(
                    (team) => team.station === "Red3"
                  );
                  context.setTeamToScout(team?.teamNumber);
                  context.setAllianceColour("red");
                  setPositionSelected("Red3");
                }}
                disabled={!isTeamSelectedEnabled}
              >
                Red 3
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Button
              className={cn(
                "w-full h-16 mt-1 !bg-teal-500 font-bold",
                positionSelected === "Human Players" &&
                  "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              disabled={!isTeamSelectedEnabled}
              onClick={() => {
                context.setIsAlternateScout(true);
                context.setTeamToScout("Human Players");
                setPositionSelected("Human Players");
              }}
            >
              Ball Scout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse mt-16 justify-between items-center">
        <ContinueButton
          disabled={context.teamToScout === ""}
          onClick={() => {
            if (context.teamToScout === "Human Players") {
              screenContext.goToScreen("alternate-scout-setup");
            } else {
              screenContext.nextScreen();
            }
          }}
        />
      </div>
    </>
  );
}
