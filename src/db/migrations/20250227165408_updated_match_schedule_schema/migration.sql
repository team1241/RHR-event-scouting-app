/*
  Warnings:

  - You are about to drop the column `blue1` on the `MatchSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `blue2` on the `MatchSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `blue3` on the `MatchSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `red1` on the `MatchSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `red2` on the `MatchSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `red3` on the `MatchSchedule` table. All the data in the column will be lost.
  - Added the required column `colour` to the `MatchSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverStation` to the `MatchSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `MatchSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamNumber` to the `MatchSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchSchedule" DROP COLUMN "blue1",
DROP COLUMN "blue2",
DROP COLUMN "blue3",
DROP COLUMN "red1",
DROP COLUMN "red2",
DROP COLUMN "red3",
ADD COLUMN     "colour" TEXT NOT NULL,
ADD COLUMN     "driverStation" INTEGER NOT NULL,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "teamNumber" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MatchSchedule" ADD CONSTRAINT "MatchSchedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
