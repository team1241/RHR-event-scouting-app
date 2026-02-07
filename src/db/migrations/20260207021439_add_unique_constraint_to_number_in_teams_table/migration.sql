/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Teams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Teams_number_key" ON "Teams"("number");
