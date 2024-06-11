/*
  Warnings:

  - You are about to drop the column `fixtureId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_fixtureId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "fixtureId";
