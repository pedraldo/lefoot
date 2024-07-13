/*
  Warnings:

  - You are about to drop the `_SquadToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SquadToUser" DROP CONSTRAINT "_SquadToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SquadToUser" DROP CONSTRAINT "_SquadToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "targetedSquadId" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "_SquadToUser";

-- CreateTable
CREATE TABLE "_UserSquad" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSquad_AB_unique" ON "_UserSquad"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSquad_B_index" ON "_UserSquad"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_targetedSquadId_fkey" FOREIGN KEY ("targetedSquadId") REFERENCES "Squad"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSquad" ADD CONSTRAINT "_UserSquad_A_fkey" FOREIGN KEY ("A") REFERENCES "Squad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSquad" ADD CONSTRAINT "_UserSquad_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
