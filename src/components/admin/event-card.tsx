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
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
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
    <Card className="w-full md:w-72">
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
