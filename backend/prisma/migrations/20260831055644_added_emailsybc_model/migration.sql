-- CreateTable
CREATE TABLE "EmailSync" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastCheckedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSync_userId_key" ON "EmailSync"("userId");

-- AddForeignKey
ALTER TABLE "EmailSync" ADD CONSTRAINT "EmailSync_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
