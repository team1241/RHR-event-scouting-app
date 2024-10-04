"use server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";
import prisma from "~/db";

const seasonWithEvents = Prisma.validator<Prisma.SeasonsDefaultArgs>()({
  include: { events: true },
});

export type SeasonWithEvents = Prisma.SeasonsGetPayload<
  typeof seasonWithEvents
>;

export async function getSeasons() {
  return await prisma.seasons.findMany({
    orderBy: { year: "desc" },
    include: { events: true },
  });
}

export async function getActiveSeason() {
  return await prisma.seasons.findFirst({
    where: {
      isActive: true,
    },
  });
}

export async function setActiveSeason(seasonId: string | undefined) {
  if (!seasonId) throw new Error("SeasonId cannot be undefined");
  // First set all of the seasons to be inactive
  await prisma.seasons.updateMany({
    where: { isActive: true },
    data: { isActive: false },
  });

  // Then set the correct season to be active
  await prisma.seasons.update({
    where: { id: parseInt(seasonId) },
    data: { isActive: true },
  });

  revalidatePath("/admin");
}

export async function createSeason(year: string, gameName: string) {
  const timestamp = formatISO(new Date());

  const existingSeasons = await prisma.seasons.findMany({
    where: { year: parseInt(year) },
  });

  if (existingSeasons.length !== 0) throw new Error("Season already exists");

  await prisma.seasons.create({
    data: {
      year: parseInt(year),
      gameName,
      isActive: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  });

  revalidatePath("/admin");
}
