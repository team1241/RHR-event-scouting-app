"use client";

import { Events } from "@prisma/client";
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
import { deleteEvent } from "~/db/queries/event";

export default function DeleteEventModal({ event }: { event: Events }) {
  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast.success(`${event.name} was successfully deleted.`);
    } catch {
      toast.error(`Error: ${event.name} was not deleted. Please try again.`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="float-right mr-2 mt-5">
          <Trash className="text-red-600 !size-6" />
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
  );
}
