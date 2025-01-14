/*
  Warnings:

  - Added the required column `wasPreviousActionUndone` to the `Actions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actions" ADD COLUMN     "wasPreviousActionUndone" BOOLEAN NOT NULL,
ALTER COLUMN "isAuto" DROP DEFAULT;
