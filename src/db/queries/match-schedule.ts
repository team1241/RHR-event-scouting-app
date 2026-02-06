'use server'

import prisma from "~/db"

export async function getTeamsForMatchInEvent({ eventId, matchNumber }: { eventId: string, matchNumber: string }) {
  return await prisma.matchSchedule.findMany({
    where: {
      eventId: {
        equals: Number(eventId)
      },
      matchNumber: {
        equals: `Q${matchNumber}`
      }
    },
    select: {
      colour: true,
      driverStation: true,
      teamNumber: true
    }
  })
}