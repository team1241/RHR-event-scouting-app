-- CreateTable
CREATE TABLE "MatchComments" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "scoutId" INTEGER NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "matchNumber" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "MatchComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchComments_eventId_matchNumber_teamNumber_key" ON "MatchComments"("eventId", "matchNumber", "teamNumber");

-- AddForeignKey
ALTER TABLE "MatchComments" ADD CONSTRAINT "MatchComments_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchComments" ADD CONSTRAINT "MatchComments_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
