"use client";

import { SeasonWithEvents } from "~/db/queries/season";
import { TriangleAlert } from "lucide-react";
import AddEventCard from "~/components/admin/add-event-card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import EventCard from "~/components/admin/event-card";

export default function EventSelector({
  activeSeason,
}: {
  activeSeason: SeasonWithEvents | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event selection</CardTitle>
        <CardDescription>
          Set the events to scout in the active season.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!activeSeason ? (
          <Alert variant="destructive">
            <TriangleAlert className="size-6" />
            <AlertTitle>No active season!</AlertTitle>
            <AlertDescription>
              You have no active season set. Please select one using the
              dropdown above.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-center lg:justify-start min-h-fit">
            <AddEventCard activeSeason={activeSeason} />
            {activeSeason &&
              activeSeason.events &&
              activeSeason.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
