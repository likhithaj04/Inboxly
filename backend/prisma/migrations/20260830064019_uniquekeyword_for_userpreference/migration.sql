/*
  Warnings:

  - You are about to drop the column `PreferedKeyword` on the `UserPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,userPreferedKeyword]` on the table `UserPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userPreferedKeyword` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "PreferedKeyword",
ADD COLUMN     "userPreferedKeyword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_userPreferedKeyword_key" ON "UserPreference"("userId", "userPreferedKeyword");
