/*
  Warnings:

  - You are about to drop the column `currency` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "currency";

-- DropEnum
DROP TYPE "Currency";
