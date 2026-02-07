"use client";

import { Events } from "@prisma/client";
import { Loader2Icon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { upsertMatchSchedule } from "~/db/queries/match-schedule";
import { fetchMatchScheduleByYearAndEventCode } from "~/server/http/frc-events";

export default function LoadMatchSchedule({
  event,
  year,
}: {
  event: Events;
  year: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const matchSchedule = await fetchMatchScheduleByYearAndEventCode(
        year.toString(),
        event.eventKey,
      );
      const formattedMatchSchedule = matchSchedule.flatMap((match) =>
        match.teams.map((team) => {
          const station = team.station ?? "";
          const driverStationMatch = station.match(/\d+/);
          const driverStation = driverStationMatch
            ? Number(driverStationMatch[0])
            : 0;
          const colour = station.toLowerCase().startsWith("red")
            ? "red"
            : "blue";

          return {
            matchNumber: `Q${match.matchNumber}`,
            teamNumber: team.teamNumber,
            driverStation,
            colour,
          };
        }),
      );
      await upsertMatchSchedule({
        eventId: event.id.toString(),
        matchSchedule: formattedMatchSchedule,
      });
      toast.success(
        `Match schedule for ${event.name} was uploaded successfully!`,
      );
    } catch (error) {
      toast.error("Failed to upload match schedule!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="w-full mt-4" onClick={onClick} disabled={isLoading}>
      Load Match Schedule
      {isLoading ? <Loader2Icon className="animate-spin " /> : <UploadIcon />}
    </Button>
  );
}
