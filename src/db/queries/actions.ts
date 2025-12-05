"use server";
import prisma from "~/db";
import { ScoutAction } from "~/components/scout/context/data-context";

export async function submitScoutDataForTeamAtEvent(
  eventCode: string,
  actions: ScoutAction[]
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

  await prisma.actions.createMany({
    data: actions.map((action) => ({
      scoutId: parseInt(action.scoutId),
      eventId,
      matchNumber: action.matchNumber,
      teamNumber: action.teamNumber,
      actionName: action.actionName,
      gamePiece: action.gamePiece,
      location: action.location,
      timestamp: action.timestamp,
      hasUndo: action.hasUndo,
      wasDefended: action.wasDefended,
      isAuto: action.isAuto,
    })),
  });
}
