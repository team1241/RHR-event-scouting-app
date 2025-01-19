"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import MatchSelectionForm from "./match-selection-form";
import { useState } from "react";
import {MoveRightIcon } from "lucide-react";

export default function ManavPage() {
  const [teamSelected, setTeamSelected] = useState("");
  const [isTeamSelectedEnabled, setTeamSelectedEnabled] = useState(false);
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
                onClick={() => setTeamSelected("1114 Simbotics")}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 1
              </Button>
              <Button
                variant={"blueTeam"}
                size={"team"}
                id="blueTwo"
                onClick={() => setTeamSelected("2056 Shazzy's team")}
                disabled={!isTeamSelectedEnabled}
              >
                Blue 2
              </Button>
              <Button
                variant={"blueTeam"}
                size={"team"}
                id="blueThree"
                onClick={() => setTeamSelected("1285 The Biggest birds")}
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
                onClick={() => setTeamSelected("5406 Celt-X")}
                disabled={!isTeamSelectedEnabled}
              >
                Red 1
              </Button>
              <Button
                variant={"redTeam"}
                size={"team"}
                id="redTwo"
                onClick={() => setTeamSelected("1241 Theory6")}
                disabled={!isTeamSelectedEnabled}
              >
                Red 2
              </Button>
              <Button
                variant={"redTeam"}
                size={"team"}
                id="redThree"
                onClick={() => setTeamSelected("987 Highrollers")}
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
        <p className="text-2xl">{`Team Scouted: ${teamSelected}`}</p>
        <Button
          className="!w-64"
          variant={"proceed"}
          size={"proceed"}
          disabled={teamSelected === ""}
        >
          Continue
          <MoveRightIcon> </MoveRightIcon>
        </Button>
      </div>
    </>
  );
}
