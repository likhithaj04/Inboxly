/*
  Warnings:

  - You are about to drop the column `priority` on the `SavedEmails` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `TemporaryEmail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SavedEmails" DROP COLUMN "priority";

-- AlterTable
ALTER TABLE "TemporaryEmail" DROP COLUMN "priority";
