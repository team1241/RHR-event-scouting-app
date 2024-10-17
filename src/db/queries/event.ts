"use server";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";
import prisma from "~/db";

export async function createEvent({
  name,
  venue,
  seasonId,
  eventType,
  eventKey,
  districtKey,
  startDate,
  endDate,
}: {
  name: string;
  venue: string | undefined;
  seasonId: number;
  eventType: string;
  eventKey: string;
  districtKey: string | undefined;
  startDate: string;
  endDate: string;
}) {
  // First check if event exists in the current season
  const currentSeason = await prisma.seasons.findUnique({
    where: { id: seasonId },
    include: { events: true },
  });

  if (currentSeason?.events.some((event) => event.eventKey === eventKey))
    throw new Error("Season already exists");

  const timestamp = formatISO(new Date());

  await prisma.events.create({
    data: {
      name,
      venue,
      season: { connect: { id: seasonId } },
      eventType,
      eventKey,
      districtKey,
      startDate: formatISO(startDate),
      endDate: formatISO(endDate),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  });

  revalidatePath("/admin");
}

export async function deleteEvent(id: number) {
  await prisma.events.delete({ where: { id } });

  revalidatePath("/admin");
}
