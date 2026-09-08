/*
  Warnings:

  - Added the required column `userId` to the `DemoEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DemoEmail" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DemoEmail" ADD CONSTRAINT "DemoEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
