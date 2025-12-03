'use server';

import prisma from "~/db";

export async function getMatchScheduleForEvent(eventId: number) {
  const schedule = await prisma.matchSchedule.findMany({
    where: {
      eventId
    }
  })

  return schedule;
}