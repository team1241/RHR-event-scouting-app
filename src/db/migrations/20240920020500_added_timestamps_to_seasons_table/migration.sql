/*
  Warnings:

  - Added the required column `createdAt` to the `Seasons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Seasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seasons" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TEXT NOT NULL;
