/*
  Warnings:

  - The `currency` column on the `UserSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('Rupee', 'Dollar', 'Euro');

-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'Rupee';
