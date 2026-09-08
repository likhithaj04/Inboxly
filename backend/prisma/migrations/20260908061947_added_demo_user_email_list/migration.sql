-- CreateTable
CREATE TABLE "DemoEmail" (
    "id" TEXT NOT NULL,
    "gmailId" TEXT NOT NULL,
    "threadId" TEXT,
    "to" TEXT,
    "from" TEXT NOT NULL,
    "subject" TEXT,
    "snippet" TEXT,
    "body" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "priority" TEXT,
    "emailDate" TIMESTAMP(3),
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoEmail_gmailId_key" ON "DemoEmail"("gmailId");
