/*
  Warnings:

  - The `metadata` column on the `Actions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Actions" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB;
