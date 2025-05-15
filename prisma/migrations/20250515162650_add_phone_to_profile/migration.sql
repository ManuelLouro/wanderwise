-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "auth0Id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_auth0Id_key" ON "Profile"("auth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
