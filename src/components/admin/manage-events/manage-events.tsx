import { SeasonWithEventsAndImages } from "~/db/queries/season";
import { TriangleAlert } from "lucide-react";
import AddEventCard from "~/components/admin/manage-events/add-event-card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import EventCard from "~/components/admin/manage-events/event-card";
import { use } from "react";

export default function ManageEvents({
  seasonsPromise,
}: {
  seasonsPromise: Promise<SeasonWithEventsAndImages[]>;
}) {
  const seasons = use(seasonsPromise);

  const activeSeason: SeasonWithEventsAndImages | undefined = seasons.find(
    (season) => season.isActive
  );

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
          <div className="flex flex-row flex-wrap gap-4 justify-center min-h-fit">
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
