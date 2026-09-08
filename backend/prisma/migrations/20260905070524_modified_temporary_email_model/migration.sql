/*
  Warnings:

  - Made the column `gmailId` on table `SavedEmails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SavedEmails" ALTER COLUMN "gmailId" SET NOT NULL;
