"use server";
import { formatISO } from "date-fns";
import prisma from "~/db";

export async function savePitScouting({
  seasonId,
  eventId,
  teamNumber,
  pitScoutingData,
}: {
  seasonId: number;
  eventId: number;
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

  await prisma.pitScouting.upsert({
    where: {
      seasonId_eventId_teamNumber: {
        seasonId,
        eventId,
        teamNumber,
      },
    },
    update: { ...pitScoutingData },
    create: {
      createdAt: timestamp,
      seasonId,
      eventId,
      teamNumber,
      ...pitScoutingData,
    },
  });
}
