/*
  Warnings:

  - You are about to drop the column `emailDate` on the `DemoEmail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DemoEmail" DROP COLUMN "emailDate",
ADD COLUMN     "date" TIMESTAMP(3);
