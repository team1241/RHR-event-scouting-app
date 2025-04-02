"use server";
import { formatISO } from "date-fns";
import prisma from "~/db";

export async function getPitScouting(eventKey: string, teamNumber: number) {
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

  if (!event || !event?.id) return;

  const pitScouting = await prisma.pitScouting.findFirst({
    where: {
      eventId: event.id,
      teamNumber,
    },
  });

  return pitScouting;
}

export async function savePitScouting({
  eventKey,
  teamNumber,
  pitScoutingData,
}: {
  eventKey: string;
  teamNumber: number;
  pitScoutingData: {
    length: string;
    width: string;
    weight: string;
    driveBase: string;
    gamepieceIntake: string;
    autonomous: string;
    teleop: string;
    endgame: string;
    gameSpecificJson: string;
    driveteamExperience: string;
    generalComments: string;
  };
}) {
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

    if (!event || !event?.id) return;

    await prisma.pitScouting.upsert({
      where: {
        eventId_teamNumber: {
          eventId: event.id,
          teamNumber,
        },
      },
      update: { ...pitScoutingData },
      create: {
        createdAt: timestamp,
        eventId: event.id,
        teamNumber,
        ...pitScoutingData,
      },
    });
  } catch (error) {
    console.log("found error");
    console.log(error);
  }
}
