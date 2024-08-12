/*
  Warnings:

  - Made the column `budgetName` on table `Expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "budgetName" SET NOT NULL;
