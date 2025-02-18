-- CreateTable
CREATE TABLE "AlternateScoutData" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "scoutId" INTEGER NOT NULL,
    "matchNumber" TEXT NOT NULL,
    "dataJSON" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "AlternateScoutData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlternateScoutData_eventId_matchNumber_key" ON "AlternateScoutData"("eventId", "matchNumber");

-- AddForeignKey
ALTER TABLE "AlternateScoutData" ADD CONSTRAINT "AlternateScoutData_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlternateScoutData" ADD CONSTRAINT "AlternateScoutData_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
