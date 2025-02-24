"use server";
import prisma from "~/db";
import { formatISO } from "date-fns";

export async function saveMatchCommentsForTeam(
  eventKey: string,
  commentsData: {
    teamNumber: number;
    scoutId: string;
    matchNumber: string;
    comments: string;
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

    if (!event || !event?.id) return;

    await prisma.matchComments.create({
      data: {
        eventId: event.id,
        scoutId: parseInt(commentsData.scoutId),
        matchNumber: commentsData.matchNumber,
        teamNumber: commentsData.teamNumber,
        comment: commentsData.comments,
        timestamp,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
