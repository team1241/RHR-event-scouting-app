-- CreateTable
CREATE TABLE "PitScoutImages" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "imageUrls" TEXT[],
    "teamNumber" INTEGER NOT NULL,

    CONSTRAINT "PitScoutImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PitScoutImages" ADD CONSTRAINT "PitScoutImages_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
