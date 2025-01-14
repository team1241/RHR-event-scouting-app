/*
  Warnings:

  - You are about to drop the column `wasPreviousActionUndone` on the `Actions` table. All the data in the column will be lost.
  - Added the required column `hasUndo` to the `Actions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actions" DROP COLUMN "wasPreviousActionUndone",
ADD COLUMN     "hasUndo" BOOLEAN NOT NULL;
