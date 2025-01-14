-- AlterTable
ALTER TABLE "Actions" ADD COLUMN     "wasDefended" BOOLEAN,
ALTER COLUMN "hasUndo" DROP NOT NULL;
