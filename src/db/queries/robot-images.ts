"use server";
import { revalidatePath } from "next/cache";
import prisma from "~/db";

export async function upsertRobotImage({
  teamNumber,
  imageUrl,
  revalidateUrl,
}: {
  teamNumber: number;
  imageUrl: string;
  revalidateUrl?: string;
}) {
  const seasonId = (
    await prisma.seasons.findMany({ where: { isActive: true } })
  )[0].id;

  await prisma.pitScoutImages.upsert({
    where: {
      seasonId_teamNumber: {
        seasonId,
        teamNumber,
      },
    },
    create: {
      teamNumber,
      imageUrls: [imageUrl],
      season: { connect: { id: seasonId } },
    },
    update: {
      imageUrls: {
        push: imageUrl,
      },
    },
  });

  if (revalidateUrl) {
    revalidatePath(revalidateUrl);
  }
}

export async function getRobotImagesForActiveSeason() {
  const images = await prisma.pitScoutImages.findMany({
    where: {
      season: {
        isActive: true,
      },
    },
  });

  return images;
}

export async function getRobotImagesForTeams(teamNumbers: number[]) {
  const images = await prisma.pitScoutImages.findMany({
    where: {
      teamNumber: {
        in: teamNumbers
      },
      season: {
        isActive: true
      }
    }
  })
  return images;
}