-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Squad" DROP CONSTRAINT "Squad_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_targetedSquadId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_targetedSquadId_fkey" FOREIGN KEY ("targetedSquadId") REFERENCES "Squad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
