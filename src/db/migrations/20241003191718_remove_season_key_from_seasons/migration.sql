/*
  Warnings:

  - You are about to drop the column `seasonKey` on the `Seasons` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Seasons_seasonKey_key";

-- AlterTable
ALTER TABLE "Seasons" DROP COLUMN "seasonKey";
