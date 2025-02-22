/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import PageHeading from "~/components/common/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getStartingPositionsForEvent } from "~/db/queries/starting-positions";
import { getUserByClerkId } from "~/db/queries/user";
import { X, Check } from "lucide-react";
import {
  MatchScheduleType,
  fetchMatchScheduleByYearAndEventCode,
} from "~/server/http/frc-events";
import { useMemo } from "react";

type StartingPosition = {
  id: number;
  eventId: number;
  scouterId: string;
  matchNumber: string;
  teamNumber: number;
  startingPosition: string;
  hasPreload: boolean;
  showedUp: boolean;
  timestamp: string;
};

export default function LeadScoutPage() {
  const { eventCode } = useParams<{ eventCode: string }>();
  const eventType = useSearchParams().get("type");
  const eventYear = eventCode.substring(0, 4);
  const eventName = eventCode.substring(4);

  const { isLoaded, isSignedIn, user } = useUser();

  const { data: userData } = useQuery({
    enabled: isLoaded && !!isSignedIn && !!user,
    queryKey: ["user"],
    queryFn: async () => getUserByClerkId(user!.id),
  });

  const { data: matchScheduleData, isLoading: isMatchScheduleLoading } =
    useQuery({
      enabled: !!eventCode,
      queryKey: [
        "matchSchedule",
        eventCode,
        eventType === "practice" ? "P" : "Q",
      ],
      queryFn: async (): Promise<MatchScheduleType[]> =>
        fetchMatchScheduleByYearAndEventCode(
          eventYear,
          eventName,
          !!eventType ? "Practice" : "Qualification"
        ),
    });

  const { data: startingPositionsData, isLoading: isStartingPositionsLoading } =
    useQuery({
      enabled: !!eventCode,
      queryKey: ["startingPositions", eventCode],
      queryFn: async (): Promise<StartingPosition[]> => {
        const startingPositions = await getStartingPositionsForEvent(eventName);
        if (!startingPositions) return [];
        return startingPositions;
      },
    });

  const groupedStartingPositionsByMatchNumber = useMemo<
    | {
        [key: string]: StartingPosition[];
      }
    | object
  >(() => {
    if (!startingPositionsData) return {};
    return Object.groupBy(
      startingPositionsData,
      ({ matchNumber }) => matchNumber
    );
  }, [startingPositionsData]);

  // THis is an example of how to use the grouped data
  function wasTeamScouted(
    currentMatchNumber: string,
    teamNumberToLookFor: number
  ) {
    let found = false;
    currentMatchNumber = "Q" + parseInt(currentMatchNumber);

    if (
      !Object.keys(groupedStartingPositionsByMatchNumber).includes(
        currentMatchNumber
      )
    ) {
      return <X className="size-10 text-red-700 " />;
    }

    const startingPositionsForMatch =
      //@ts-expect-error we know the type (sources: just trust me)
      groupedStartingPositionsByMatchNumber[currentMatchNumber];

    startingPositionsForMatch.forEach(
      (startingPosition: { teamNumber: any }) => {
        const team = startingPosition.teamNumber;
        if (team === teamNumberToLookFor) {
          found = true;
        }
      }
    );
    if (found) {
      return <Check className="size-10 text-green-600" />;
    } else {
      return <X className="size-10 text-red-700 " />;
    }
  }

  return (
    <div>
      <PageHeading>Lead Scout Page</PageHeading>
      {matchScheduleData &&
        matchScheduleData.map((match, index) => {
          return (
            <Card key={`match-card-${index}`}>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardContent>
                  <div className="flex flex-row justify-between">
                    <div className=" justify-start my-5">
                      <a className="text-2xl font-bold">
                        Qualification {match.matchNumber}
                      </a>
                    </div>

                    <div className="flex flex-row space-x-10">
                      <div className="flex flex-col align-middle">
                        <p className="text-3xl my-5 font-semibold bg-blue-600 dark:ring-4 ring-blue-900 ">
                          {match.teams[0].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[0].teamNumber
                        )}
                      </div>
                      <div className="flex flex-col align-middle">
                        <p className="text-3xl my-5 font-semibold bg-blue-600 dark:ring-4 ring-blue-900 ">
                          {match.teams[1].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[1].teamNumber
                        )}
                      </div>
                      <div className="flex flex-col align-middle">
                        <p className="text-3xl my-5 font-semibold bg-blue-600 dark:ring-4 ring-blue-900 ">
                          {match.teams[2].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[2].teamNumber
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-10">
                      <div className="flex flex-col align-middle">
                        <p className="text-3xl my-5 font-semibold bg-red-600 dark:ring-4 ring-red-900 ">
                          {match.teams[3].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[3].teamNumber
                        )}
                      </div>
                      <div className="flex flex-col align-middle">
                        <p className="text-3xl my-5 font-semibold bg-red-600 dark:ring-4 ring-red-900 ">
                          {match.teams[4].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[4].teamNumber
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-3xl my-5 font-semibold bg-red-600 dark:ring-4 ring-red-900 ">
                          {match.teams[5].teamNumber}
                        </p>
                        {wasTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[5].teamNumber
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          );
        })}
    </div>
  );
}
