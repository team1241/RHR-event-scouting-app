'use server'

import { Prisma } from "@prisma/client";
import prisma from "~/db";
import { fetchTeamsForEvent } from "~/server/http/frc-events";

export async function fetchAndCreateTeamsForEvent(year: number, eventCode: string) {
  const teams = await fetchTeamsForEvent(year.toString(), eventCode)
  const formattedTeams = teams.map(team => ({ name: team.nameShort, number: team.teamNumber }))
  await createTeams(formattedTeams)
}

export async function createTeams(teams: Prisma.TeamsCreateInput[]) {
  await prisma.teams.createMany({ data: teams, skipDuplicates: true })
}

export async function getTeamsAtEvent(eventCode: string) {
  const year = eventCode.substring(0, 4)
  const eventKey = eventCode.substring(4)
  return await prisma.teams.findMany({
    where: {
      matchSchedules: {
        some: {
          event: {
            season: {
              year: {
                equals: Number(year)
              }
            },
            eventKey: {
              equals: eventKey
            }
          }
        },
      }
    },
    orderBy: {
      number: "asc"
    },
  })
}
