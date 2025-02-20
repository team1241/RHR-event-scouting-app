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
      queryFn: async () => {
        const positions = await getStartingPositionsForEvent(eventName);
        return Object.groupBy(positions, ({ matchNumber }) => matchNumber);
      },
    });

  // function startingPositionSelected({
  //   teamNumber,
  //   matchNumber,
  // }: {
  //   teamNumber: number;
  //   matchNumber: number;
  // }) {
  //   if (startingPositionsData) {
  //     startingPositionsData[matchNumber][0].
  //   }
  // }
  console.log(startingPositionsData);

  return (
    <div>
      <PageHeading>Lead scout page</PageHeading>
      {matchScheduleData &&
        matchScheduleData.map((match) => (
          // eslint-disable-next-line react/jsx-key
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className=" justify-start">
                    <a className="text-2xl font-semibold">
                      Qualification {match.matchNumber}
                    </a>
                  </div>

                  <div className="flex flex-row space-x-10">
                    <div className="flex flex-col align-middle">
                      <p className="text-2xl font-semibold">
                        {match.teams[0].teamNumber}
                      </p>
                      <X className="size-10 text-red-700 " />
                    </div>
                    <div className="flex flex-col align-middle">
                      <p className="text-2xl font-semibold">
                        {match.teams[1].teamNumber}
                      </p>
                      <X className="size-10 text-red-700 " />
                    </div>
                    <div className="flex flex-col align-middle">
                      <p className="text-2xl font-semibold">
                        {match.teams[2].teamNumber}
                      </p>
                      <X className="size-10 text-red-700 " />
                    </div>
                  </div>

                  <div className="flex flex-row space-x-10">
                    <div className="flex flex-col align-middle">
                      <p className="text-2xl font-semibold">
                        {match.teams[3].teamNumber}
                      </p>
                      <X className="size-10 text-red-700" />
                    </div>
                    <div className="flex flex-col align-middle">
                      <p className="text-2xl font-semibold">
                        {match.teams[4].teamNumber}
                      </p>
                      <X className="size-10 text-red-700 " />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-semibold">
                        {match.teams[5].teamNumber}
                      </p>
                      <X className="size-10 text-red-700 " />
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
