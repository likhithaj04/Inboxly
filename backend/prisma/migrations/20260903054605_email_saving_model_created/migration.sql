/*
  Warnings:

  - You are about to drop the column `rom` on the `TemporaryEmail` table. All the data in the column will be lost.
  - Added the required column `from` to the `TemporaryEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemporaryEmail" DROP COLUMN "rom",
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT;
