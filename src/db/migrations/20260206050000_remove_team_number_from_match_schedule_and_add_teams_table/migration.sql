/*
  Warnings:

  - You are about to drop the column `teamName` on the `MatchSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchSchedule" DROP COLUMN "teamName";

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);
