"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import MatchSelectionForm from "./common/match-selection-form";
import { useContext, useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import { cn } from "~/lib/utils";
import ContinueButton from "./common/continue-button";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMatchScheduleByYearAndEventCode,
  MatchScheduleType,
} from "~/server/http/frc-events";
import { LOCAL_STORAGE_KEYS } from "~/app/scout/[eventCode]/constants";

export default function MatchSelectionScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);

  const eventYear = context.eventCode.substring(0, 4);
  const eventName = context.eventCode.substring(4);

  const localStorageKey = `${LOCAL_STORAGE_KEYS.MATCH_SCHEDULE}:${
    context.eventCode
  }:${context.eventType === "practice" ? "P" : "Q"}`;

  const hasMatchScheduleLocally = !!localStorage.getItem(localStorageKey);

  const { data: matchScheduleData, isLoading: isMatchScheduleLoading } =
    useQuery({
      enabled: !!context.eventCode && !hasMatchScheduleLocally,
      queryKey: [
        "matchSchedule",
        context.eventCode,
        context.eventType === "practice" ? "P" : "Q",
      ],
      queryFn: async (): Promise<MatchScheduleType[]> => {
        const schedule = await fetchMatchScheduleByYearAndEventCode(
          eventYear,
          eventName,
          context.eventType === "practice" ? "Practice" : "Qualification"
        );

        localStorage.setItem(localStorageKey, JSON.stringify(schedule));

        return schedule;
      },
    });

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

  useEffect(() => {
    if (matchScheduleData) {
      context.setMatchSchedule(matchScheduleData);
    }
  }, [matchScheduleData]);

  return (
    <>
      {/* Match selection */}
      <PageHeading>Match Selection</PageHeading>
      <div className="flex justify-around gap-4">
        <div className="place-self-center">
          <MatchSelectionForm
            setTeamSelectedEnabled={setTeamSelectedEnabled}
            isMatchScheduleLoading={isMatchScheduleLoading}
          />
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <div className="flex flex-row justify-end gap-2">
            <div className="flex flex-col space-y-3">
              {/* BLUE BUTTONS */}
              {[1, 2, 3].map((position) => {
                const team = context?.currentMatch?.teams.find(
                  (team) => team.station === `Blue${position}`
                );
                return (
                  <Button
                    key={`blue-button-${position}`}
                    variant={"blueTeam"}
                    className={cn(
                      "text-xl",
                      positionSelected === `Blue${position}` &&
                        "dark:ring-2 ring-yellow-400 ring-offset-4"
                    )}
                    size={"team"}
                    id={`blue${position}`}
                    onClick={() => {
                      context.setTeamToScout(team?.teamNumber);
                      context.setAllianceColour("blue");
                      setPositionSelected(`Blue${position}`);
                      context.setIsAlternateScout(false);
                    }}
                    disabled={!isTeamSelectedEnabled}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p>{`Blue ${position}`}</p>
                      <p>{team?.teamNumber && `(${team?.teamNumber})`}</p>
                    </div>
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-col space-y-3">
              {/* RED BUTTONS */}
              {[1, 2, 3].map((position) => {
                const team = context?.currentMatch?.teams.find(
                  (team) => team.station === `Red${position}`
                );
                return (
                  <Button
                    key={`red-button-${position}`}
                    variant={"redTeam"}
                    className={cn(
                      "text-xl",
                      positionSelected === `Red${position}` &&
                        "dark:ring-2 ring-yellow-400 ring-offset-4"
                    )}
                    size={"team"}
                    id={`red${position}`}
                    onClick={() => {
                      context.setTeamToScout(team?.teamNumber);
                      context.setAllianceColour("red");
                      setPositionSelected(`Red${position}`);
                      context.setIsAlternateScout(false);
                    }}
                    disabled={!isTeamSelectedEnabled}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p>{`Red ${position}`}</p>
                      <p>{team?.teamNumber && `(${team?.teamNumber})`}</p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <Button
              className={cn(
                "w-full h-20 mt-1 !bg-teal-500 font-bold text-xl",
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
          disabled={!context.teamToScout}
          onClick={() => {
            if (context.teamToScout === "Human Players") {
              screenContext.goToScreen("alternate-scout-setup");
            } else {
              screenContext.nextScreen();
            }
          }}
          shouldShowIcon
        />
      </div>
    </>
  );
}
