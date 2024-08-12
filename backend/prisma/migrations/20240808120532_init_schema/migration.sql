/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "categoriesId";

-- DropTable
DROP TABLE "Categories";
