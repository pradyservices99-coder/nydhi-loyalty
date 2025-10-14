-- CreateTable
CREATE TABLE "LoyaltyPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerEmail" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
