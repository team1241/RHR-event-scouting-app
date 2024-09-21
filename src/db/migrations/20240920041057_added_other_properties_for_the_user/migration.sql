/*
  Warnings:

  - Added the required column `team` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Team" AS ENUM ('THEORY', 'BANG');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "team" "Team" NOT NULL;
