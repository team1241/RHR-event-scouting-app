"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Seasons } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { createEvent } from "~/db/queries/event";
import { fetchEventByYearAndCode } from "~/server/http/frc-events";

export default function AddEventCard({
  activeSeason,
}: {
  activeSeason: Seasons;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const newFormSchema = z.object({
    eventCode: z
      .string({ message: "Event code is required" })
      .refine((value) => value !== "", "Event code is required"),
  });

  const newEventForm = useForm({
    mode: "all",
    resolver: zodResolver(newFormSchema),
    values: {
      eventCode: "",
    },
  });

  const addEvent = async () => {
    const eventCode = newEventForm.getValues("eventCode");
    setIsSubmitting(true);
    try {
      const eventData = await fetchEventByYearAndCode(
        activeSeason.year.toString(),
        eventCode
      );
      await createEvent({
        name: eventData.name,
        venue: eventData.venue,
        seasonId: activeSeason.id,
        eventKey: eventCode,
        eventType: eventData.type,
        districtKey: eventData?.districtCode,
        startDate: eventData.dateStart,
        endDate: eventData.dateEnd,
      });
      setIsPopoverOpen(false);
      toast.success(`${eventCode.toUpperCase()} was created successfully!`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
        return;
      }
      toast.error("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={() => {
        setIsPopoverOpen(!isPopoverOpen);
        newEventForm.reset();
      }}
    >
      <PopoverTrigger asChild>
        <Card
          className="border-dashed border-slate-500 w-full md:w-72 h-24 md:h-52 cursor-pointer"
          onClick={() => setIsPopoverOpen(true)}
        >
          <div className="flex flex-col h-full items-center justify-center text-slate-500">
            <div className="flex flex-row w-full gap-1 justify-center items-center">
              <PlusCircle className="size-5" />
              Add event
            </div>
          </div>
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...newEventForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={newEventForm.handleSubmit(addEvent)}
          >
            {/* EVENT CODE */}
            <FormField
              name="eventCode"
              control={newEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event code</FormLabel>
                  <FormDescription>
                    <span className="font-semibold">Note: </span>Please{" "}
                    <span className="italic font-semibold">exclude</span> the
                    year.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} placeholder="Ex: onbar" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-1/2 transition-all">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PlusCircle />
              )}
              Add
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
