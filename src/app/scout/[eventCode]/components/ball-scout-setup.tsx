"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import BackButton from "./common/back-button";
import ContinueButton from "./common/continue-button";
import { useContext, useState } from "react";
import { cn } from "~/lib/utils";
import { ScoutDataContext } from "../context";

export default function BallScoutSetup() {
  const [redHumanPlayerSelected, setRedHumanPlayerSelected] = useState("");
  const [blueHumanPlayerSelected, setBlueHumanPlayerSelected] = useState("");
  const context = useContext(ScoutDataContext);

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
              redHumanPlayerSelected === "red1" &&
                "dark:ring-yellow-400 ring-2 ring-offset-4"
            )}
            onClick={() => {
              setRedHumanPlayerSelected("red1");
              updateTeamNumber(1241, "red");
            }}
          >
            Red 1
          </Button>
          <Button
            variant={"redTeam"}
            id="redTwo"
            className={cn(
              "h-20 text-2xl",
              redHumanPlayerSelected === "red2" &&
                "dark:ring-2 ring-yellow-400 ring-offset-4"
            )}
            onClick={() => {
              setRedHumanPlayerSelected("red2");
              updateTeamNumber(1285, "red");
            }}
          >
            Red 2
          </Button>
          <Button
            variant={"redTeam"}
            id="redThree"
            className={cn(
              "h-20 text-2xl",
              redHumanPlayerSelected === "red3" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
            )}
            onClick={() => {
              setRedHumanPlayerSelected("red3");
              updateTeamNumber(1234, "red");
            }}
          >
            Red 3
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
                "dark:ring-2 ring-yellow-400  ring-offset-4"
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue1");
              updateTeamNumber(4321, "blue");
            }}
          >
            {" "}
            Blue 1
          </Button>
          <Button
            variant={"blueTeam"}
            id="blueTwo"
            className={cn(
              "h-20 text-2xl",
              blueHumanPlayerSelected === "blue2" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue2");
              updateTeamNumber(2281, "blue");
            }}
          >
            {" "}
            Blue 2
          </Button>
          <Button
            variant={"blueTeam"}
            id="blueThree"
            className={cn(
              "h-20 text-2xl",
              blueHumanPlayerSelected === "blue3" &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
            )}
            onClick={() => {
              setBlueHumanPlayerSelected("blue3");
              updateTeamNumber(1324, "blue");
            }}
          >
            {" "}
            Blue 3
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between my-20">
        <BackButton />
        <ContinueButton
          disabled={
            redHumanPlayerSelected === "" || blueHumanPlayerSelected === ""
          }
        />
      </div>
    </>
  );
}
