import { Events } from "@prisma/client";
import { parseISO } from "date-fns";
import DeleteEventModal from "~/components/admin/manage-events/delete-event-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";

export default function EventCard({ event }: { event: Events }) {
  return (
    <Card className="w-full md:w-72">
      <DeleteEventModal event={event} />
      <div className="p-6">
        <CardTitle className="leading-normal overflow-hidden text-ellipsis text-nowrap">
          {event.name}
        </CardTitle>
        <CardDescription className="font-semibold">
          {event.eventKey.toUpperCase()}
        </CardDescription>
      </div>
      <CardContent>
        <div className="flex flex-row justify-between">
          <p>
            <span className="font-semibold">Location:</span>{" "}
          </p>
          <p>{event.venue}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>
            <span className="font-semibold">Start date:</span>{" "}
          </p>
          <p>{parseISO(event.startDate).toDateString()}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>
            <span className="font-semibold">End date:</span>{" "}
          </p>
          <p>{parseISO(event.endDate).toDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
