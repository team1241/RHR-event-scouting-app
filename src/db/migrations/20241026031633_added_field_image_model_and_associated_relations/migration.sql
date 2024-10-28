-- CreateEnum
CREATE TYPE "FieldImageType" AS ENUM ('FULL_FIELD', 'RED_HALF', 'BLUE_HALF');

-- CreateTable
CREATE TABLE "FieldImages" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "type" "FieldImageType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "FieldImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FieldImages" ADD CONSTRAINT "FieldImages_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
