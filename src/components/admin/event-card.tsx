import { Events } from "@prisma/client";
import { parseISO } from "date-fns";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { deleteEvent } from "~/db/queries/event";

export default function EventCard({ event }: { event: Events }) {
  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast.success(`${event.name} was successfully deleted.`);
    } catch {
      toast.error(`Error: ${event.name} was not deleted. Please try again.`);
    }
  };

  return (
    <Card className="w-full md:w-72 md:h-36">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="float-right mr-2 mt-5">
            <Trash className="size-6 text-red-600" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete{" "}
              <span className="font-semibold italic">{event.name}</span>. This
              will delete all data associated with this event so please proceed
              with caution.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="space-y-1.5 p-6">
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <CardTitle className="leading-normal overflow-hidden text-ellipsis text-nowrap cursor-pointer">
              {`${event.eventKey.toUpperCase()} - ${event.venue}`}
            </CardTitle>
          </HoverCardTrigger>
          <HoverCardContent
            className="font-semibold text-lg text-center cursor-auto"
            side="top"
            sideOffset={16}
          >
            <HoverCardArrow />
            {event.name}
          </HoverCardContent>
        </HoverCard>
      </div>
      <CardContent>
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
