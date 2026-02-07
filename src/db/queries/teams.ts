'use server'

import { Prisma } from "@prisma/client";
import prisma from "~/db";

export async function createTeams(teams: Prisma.TeamsCreateInput[]) {
  await prisma.teams.createMany({ data: teams, skipDuplicates: true })
}