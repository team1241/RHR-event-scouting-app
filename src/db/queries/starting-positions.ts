"use server";

import { formatISO } from "date-fns";
import prisma from "~/db";

export async function getStartingPositionsForEvent(eventKey: string): Promise<
  | {
      id: number;
      eventId: number;
      scouterId: string;
      matchNumber: string;
      teamNumber: number;
      startingPosition: string;
      hasPreload: boolean;
      showedUp: boolean;
      timestamp: string;
    }[]
  | undefined
> {
  try {
    const event = await prisma.events.findFirst({
      where: {
        season: {
          isActive: true,
        },
        eventKey,
      },
      select: {
        id: true,
      },
    });

    if (!event) return [];

    // const response = await prisma.startingPositions.groupBy({
    //   by: ["matchNumber", "teamNumber", "startingPosition"],
    //   where: {
    //     event,
    //   },
    //   orderBy: {
    //     matchNumber: "asc",
    //   },
    // });
    const response = await prisma.startingPositions.findMany({
      where: {
        event,
      },
      orderBy: {
        matchNumber: "asc",
      },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function saveStartingPositionForTeamAtEvent(
  eventKey: string,
  startingPosition: {
    scouterId: string;
    matchNumber: string;
    teamNumber: number;
    startingPosition: string;
    hasPreload: boolean;
    showedUp: boolean;
  }
) {
  const timestamp = formatISO(new Date());

  try {
    const event = await prisma.events.findFirst({
      where: {
        season: {
          isActive: true,
        },
        eventKey,
      },
      select: {
        id: true,
      },
    });

    await prisma.startingPositions.upsert({
      where: {
        eventId_matchNumber_teamNumber: {
          eventId: event!.id,
          matchNumber: startingPosition.matchNumber,
          teamNumber: startingPosition.teamNumber,
        },
      },
      create: {
        event: { connect: { id: event?.id } },
        scouterId: startingPosition.scouterId,
        matchNumber: startingPosition.matchNumber,
        teamNumber: startingPosition.teamNumber,
        startingPosition: startingPosition.startingPosition,
        hasPreload: startingPosition.hasPreload,
        showedUp: startingPosition.showedUp,
        timestamp,
      },
      update: {
        startingPosition: startingPosition.startingPosition,
        hasPreload: startingPosition.hasPreload,
        showedUp: startingPosition.showedUp,
        timestamp,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
