/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "countryCodeId" INTEGER,
    "phoneNumber" INTEGER,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_countryCodeId_fkey" FOREIGN KEY ("countryCodeId") REFERENCES "countryCode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "countryCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "englishName" TEXT NOT NULL,
    "chineseName" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "phoneCode" INTEGER NOT NULL
);
