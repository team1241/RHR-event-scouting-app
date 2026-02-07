-- AddForeignKey
ALTER TABLE "MatchSchedule" ADD CONSTRAINT "MatchSchedule_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Teams"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
