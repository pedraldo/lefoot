/*
  Warnings:

  - You are about to drop the column `date_time` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `team_A_id` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `team_A_score` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `team_B_id` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `team_B_score` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the `UsersOnTeams` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[homeTeamId]` on the table `Fixture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[awayTeamId]` on the table `Fixture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `awayScore` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awayTeamId` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeScore` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_team_A_id_fkey";

-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_team_B_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnTeams" DROP CONSTRAINT "UsersOnTeams_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnTeams" DROP CONSTRAINT "UsersOnTeams_userId_fkey";

-- DropIndex
DROP INDEX "Fixture_team_A_id_key";

-- DropIndex
DROP INDEX "Fixture_team_B_id_key";

-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "date_time",
DROP COLUMN "team_A_id",
DROP COLUMN "team_A_score",
DROP COLUMN "team_B_id",
DROP COLUMN "team_B_score",
ADD COLUMN     "awayScore" INTEGER NOT NULL,
ADD COLUMN     "awayTeamId" TEXT NOT NULL,
ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "homeScore" INTEGER NOT NULL,
ADD COLUMN     "homeTeamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "fixtureId" TEXT;

-- DropTable
DROP TABLE "UsersOnTeams";

-- CreateTable
CREATE TABLE "_TeamToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_homeTeamId_key" ON "Fixture"("homeTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_awayTeamId_key" ON "Fixture"("awayTeamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
