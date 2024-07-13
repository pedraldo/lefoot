/*
  Warnings:

  - You are about to drop the column `isGuest` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isGuest";

-- CreateTable
CREATE TABLE "_UserGuestSquad" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserGuestSquad_AB_unique" ON "_UserGuestSquad"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGuestSquad_B_index" ON "_UserGuestSquad"("B");

-- AddForeignKey
ALTER TABLE "_UserGuestSquad" ADD CONSTRAINT "_UserGuestSquad_A_fkey" FOREIGN KEY ("A") REFERENCES "Squad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuestSquad" ADD CONSTRAINT "_UserGuestSquad_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
