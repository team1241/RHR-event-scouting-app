"use server";
import { revalidatePath } from "next/cache";
import { formatISO } from "date-fns";
import prisma from "~/db";
import { FieldImageType } from "@prisma/client";

export async function upsertFieldImage({
  fieldImageType,
  seasonId,
  imageUrl,
}: {
  fieldImageType: FieldImageType;
  seasonId: number;
  imageUrl: string;
}) {
  const timestamp = formatISO(new Date());

  await prisma.fieldImages.upsert({
    where: {
      seasonId_type: {
        seasonId,
        type: fieldImageType,
      },
    },
    create: {
      type: fieldImageType,
      imageUrl,
      createdAt: timestamp,
      updatedAt: timestamp,
      season: { connect: { id: seasonId } },
    },
    update: {
      imageUrl,
      updatedAt: timestamp,
    },
  });

  revalidatePath("/admin");
}

export async function deleteFieldImage({
  seasonId,
  fieldImageType,
  shouldRevalidate = false,
}: {
  seasonId: number;
  fieldImageType: FieldImageType;
  shouldRevalidate?: boolean;
}) {
  await prisma.fieldImages.delete({
    where: {
      seasonId_type: {
        seasonId,
        type: fieldImageType,
      },
    },
  });

  if (shouldRevalidate) revalidatePath("/admin");
}
