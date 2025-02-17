/*
  Warnings:

  - You are about to drop the column `wasFogHorned` on the `Actions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId,matchNumber,teamNumber]` on the table `StartingPositions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Actions" DROP COLUMN "wasFogHorned";

-- CreateIndex
CREATE UNIQUE INDEX "StartingPositions_eventId_matchNumber_teamNumber_key" ON "StartingPositions"("eventId", "matchNumber", "teamNumber");
