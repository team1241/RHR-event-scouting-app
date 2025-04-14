"use server";
import { Prisma, Team } from "@prisma/client";
import { formatISO } from "date-fns";
import { revalidatePath } from "next/cache";
import prisma from "~/db";

export async function getAllUsers() {
  return await prisma.users.findMany({ orderBy: { isActive: "desc" } });
}

export async function getUserByClerkId(clerkId: string) {
  return await prisma.users.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function updateUser(
  id: number,
  updateData: Prisma.UsersUpdateInput
) {
  const result = await prisma.users.update({ where: { id }, data: updateData });
  revalidatePath("/admin");
  return result;
}

export async function completeUserRegistration(
  clerkId: string,
  grade: string,
  team: Team
) {
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
