-- CreateTable
CREATE TABLE "PitScouting" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "length" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "driveBase" TEXT NOT NULL,
    "gamepieceIntake" TEXT NOT NULL,
    "autonomous" TEXT NOT NULL,
    "teleop" TEXT NOT NULL,
    "endgame" TEXT NOT NULL,
    "gameSpecificJson" TEXT NOT NULL,
    "driveteamExperience" TEXT NOT NULL,
    "generalComments" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "PitScouting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PitScouting_seasonId_eventId_teamNumber_key" ON "PitScouting"("seasonId", "eventId", "teamNumber");

-- AddForeignKey
ALTER TABLE "PitScouting" ADD CONSTRAINT "PitScouting_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitScouting" ADD CONSTRAINT "PitScouting_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
