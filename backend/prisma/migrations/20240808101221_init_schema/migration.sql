/*
  Warnings:

  - Made the column `name` on table `Budget` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "name" SET NOT NULL;
