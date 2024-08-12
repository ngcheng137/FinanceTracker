/*
  Warnings:

  - Added the required column `budgetExpenseId` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "budgetExpenseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_budgetExpenseId_fkey" FOREIGN KEY ("budgetExpenseId") REFERENCES "BudgetExpenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
