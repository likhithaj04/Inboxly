/*
  Warnings:

  - A unique constraint covering the columns `[userId,keyword]` on the table `KeywordStat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserPreference_userId_userPreferedKeyword_key";

-- CreateIndex
CREATE UNIQUE INDEX "KeywordStat_userId_keyword_key" ON "KeywordStat"("userId", "keyword");
