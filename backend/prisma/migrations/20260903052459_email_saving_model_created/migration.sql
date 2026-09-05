-- CreateTable
CREATE TABLE "SavedEmails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gmailId" TEXT,
    "threadId" TEXT,
    "from" TEXT,
    "to" TEXT,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "priority" TEXT,
    "emailDate" TIMESTAMP(3),
    "isImportant" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedEmails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporaryEmail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gmailId" TEXT NOT NULL,
    "threadId" TEXT,
    "rom" TEXT,
    "subject" TEXT,
    "snippet" TEXT,
    "body" TEXT,
    "priority" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "emailDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemporaryEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedEmails_userId_gmailId_key" ON "SavedEmails"("userId", "gmailId");

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryEmail_userId_gmailId_key" ON "TemporaryEmail"("userId", "gmailId");

-- AddForeignKey
ALTER TABLE "SavedEmails" ADD CONSTRAINT "SavedEmails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporaryEmail" ADD CONSTRAINT "TemporaryEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
