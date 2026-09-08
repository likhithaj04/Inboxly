/*
  Warnings:

  - Added the required column `priority` to the `TemporaryEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemporaryEmail" ADD COLUMN     "priority" TEXT NOT NULL;
