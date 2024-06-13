/*
  Warnings:

  - Added the required column `creationDate` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL;
