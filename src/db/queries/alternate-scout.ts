"use server";

import { formatISO } from "date-fns";
import prisma from "~/db";

export async function submitAlternateScoutDataForMatch(
  eventCode: string,
  alternateScoutData: {
    scoutId: string;
    matchNumber: string;
    data: string;
  }
) {
  const event = await prisma.events.findFirst({
    where: {
      season: {
        isActive: true,
      },
      eventKey: eventCode,
    },
    select: {
      id: true,
    },
  });

  if (!event || !event?.id) return;

  const eventId = event.id;

  await prisma.alternateScoutData.create({
    data: {
      eventId,
      scoutId: parseInt(alternateScoutData.scoutId),
      matchNumber: alternateScoutData.matchNumber,
      dataJSON: alternateScoutData.data,
      timestamp: formatISO(new Date()),
    },
  });
}
