-- CreateTable
CREATE TABLE "StartingPositions" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "scouterId" TEXT NOT NULL,
    "matchNumber" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "startingPosition" TEXT NOT NULL,
    "hasPreload" BOOLEAN NOT NULL,
    "showedUp" BOOLEAN NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "StartingPositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actions" (
    "id" SERIAL NOT NULL,
    "isAuto" BOOLEAN NOT NULL DEFAULT false,
    "eventId" INTEGER NOT NULL,
    "scoutId" INTEGER NOT NULL,
    "matchNumber" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "actionName" TEXT NOT NULL,
    "gamePiece" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StartingPositions" ADD CONSTRAINT "StartingPositions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
