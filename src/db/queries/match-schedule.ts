'use server'

import prisma from "~/db"

interface TeamsForMatchInEventProps {
  eventId: string,
  matchNumber: string
}

export async function getTeamsForMatchInEvent({ eventId, matchNumber }: TeamsForMatchInEventProps) {
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

interface UpsertMatchScheduleProps {
  eventId: string,
  matchSchedule: {
    matchNumber: string,
    teamNumber: number,
    driverStation: number,
    colour: string
  }[]
}
export async function upsertMatchSchedule({ eventId, matchSchedule }: UpsertMatchScheduleProps) {
  const numericEventId = Number(eventId)
  if (!Number.isFinite(numericEventId)) {
    throw new Error(`Invalid eventId: ${eventId}`)
  }

  if (matchSchedule.length === 0) return

  await prisma.$transaction(async (tx) => {
    const existingCount = await tx.matchSchedule.count({
      where: {
        eventId: numericEventId
      }
    })

    if (existingCount > 0) {
      await tx.matchSchedule.deleteMany({
        where: {
          eventId: numericEventId
        }
      })
    }

    await tx.matchSchedule.createMany({
      data: matchSchedule.map((match) => ({
        eventId: numericEventId,
        matchNumber: match.matchNumber,
        teamNumber: match.teamNumber,
        driverStation: match.driverStation,
        colour: match.colour
      }))
    })
  })
}
