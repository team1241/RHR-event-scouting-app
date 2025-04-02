/*
  Warnings:

  - You are about to drop the column `seasonId` on the `PitScouting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId,teamNumber]` on the table `PitScouting` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PitScouting" DROP CONSTRAINT "PitScouting_seasonId_fkey";

-- DropIndex
DROP INDEX "PitScouting_seasonId_eventId_teamNumber_key";

-- AlterTable
ALTER TABLE "PitScouting" DROP COLUMN "seasonId";

-- CreateIndex
CREATE UNIQUE INDEX "PitScouting_eventId_teamNumber_key" ON "PitScouting"("eventId", "teamNumber");
