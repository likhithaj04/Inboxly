/*
  Warnings:

  - You are about to drop the column `nread` on the `KeywordStat` table. All the data in the column will be lost.
  - You are about to drop the column `uread` on the `KeywordStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KeywordStat" DROP COLUMN "nread",
DROP COLUMN "uread",
ADD COLUMN     "read" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unread" INTEGER NOT NULL DEFAULT 0;
