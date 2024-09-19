-- CreateTable
CREATE TABLE "Seasons" (
    "id" SERIAL NOT NULL,
    "seasonKey" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,

    CONSTRAINT "Seasons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seasons_seasonKey_key" ON "Seasons"("seasonKey");
