"use server";

import { formatISO } from "date-fns";
import prisma from "~/db";

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

    console.log(event);

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
