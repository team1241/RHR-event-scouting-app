/*
  Warnings:

  - A unique constraint covering the columns `[seasonId,type]` on the table `FieldImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FieldImages_seasonId_type_key" ON "FieldImages"("seasonId", "type");
