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
  function renderTeamScouted(
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
      return <X className="size-12 text-red-700 " />;
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
      return <Check className="size-12 text-green-600" />;
    } else {
      return <X className="size-12 text-red-700 " />;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeading>Lead Scout Page</PageHeading>
      {matchScheduleData &&
        matchScheduleData.map((match, index) => {
          return (
            <Card key={`match-card-${index}`}>
              <CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col  justify-center">
                      <a className="text-3xl font-bold">
                        Qualification {match.matchNumber}
                      </a>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-blue-600 text-center p-2 rounded-md">
                          {match.teams[0].teamNumber}
                        </p>
                        {renderTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[0].teamNumber
                        )}
                      </div>
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-blue-600 text-center p-2 rounded-md ">
                          {match.teams[1].teamNumber}
                        </p>
                        {renderTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[1].teamNumber
                        )}
                      </div>
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-blue-600 text-center p-2 rounded-md ">
                          {match.teams[2].teamNumber}
                        </p>
                        {renderTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[2].teamNumber
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-red-600 text-center p-2 rounded-md ">
                          {match.teams[3].teamNumber}
                        </p>
                        {renderTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[3].teamNumber
                        )}
                      </div>
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-red-600 text-center p-2 rounded-md ">
                          {match.teams[4].teamNumber}
                        </p>
                        {renderTeamScouted(
                          match.matchNumber.toString(),
                          match.teams[4].teamNumber
                        )}
                      </div>
                      <div className="w-24 flex flex-col justify-between items-center">
                        <p className="w-24 text-3xl font-semibold bg-red-600 text-center p-2 rounded-md ">
                          {match.teams[5].teamNumber}
                        </p>
                        {renderTeamScouted(
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
