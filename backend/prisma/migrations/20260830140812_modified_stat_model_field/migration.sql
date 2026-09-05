/*
  Warnings:

  - You are about to drop the column `read` on the `KeywordStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KeywordStat" DROP COLUMN "read",
ADD COLUMN     "nread" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uread" INTEGER NOT NULL DEFAULT 0;
