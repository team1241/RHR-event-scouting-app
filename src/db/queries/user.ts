"use server";
import { Team } from "@prisma/client";
import { formatISO } from "date-fns";
import prisma from "~/db";

export async function getUserByClerkId(clerkId: string) {
  return await prisma.users.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function completeUserRegistration(
  clerkId: string,
  grade: string,
  teamNumber: string
) {
  const team = teamNumber === "1241" ? Team.THEORY : Team.BANG;
  return await prisma.users.update({
    where: { clerkId },
    data: {
      grade,
      team,
      isSignupComplete: true,
      updatedAt: formatISO(new Date()),
    },
  });
}
