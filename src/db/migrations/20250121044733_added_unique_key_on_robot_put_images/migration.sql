/*
  Warnings:

  - A unique constraint covering the columns `[seasonId,teamNumber]` on the table `PitScoutImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PitScoutImages_seasonId_teamNumber_key" ON "PitScoutImages"("seasonId", "teamNumber");
