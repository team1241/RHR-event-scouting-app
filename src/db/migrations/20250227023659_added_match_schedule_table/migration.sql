-- CreateTable
CREATE TABLE "MatchSchedule" (
    "id" SERIAL NOT NULL,
    "matchNumber" TEXT NOT NULL,
    "blue1" TEXT NOT NULL,
    "blue2" TEXT NOT NULL,
    "blue3" TEXT NOT NULL,
    "red1" TEXT NOT NULL,
    "red2" TEXT NOT NULL,
    "red3" TEXT NOT NULL,

    CONSTRAINT "MatchSchedule_pkey" PRIMARY KEY ("id")
);
