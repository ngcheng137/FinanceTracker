-- CreateTable
CREATE TABLE "BudgetExpenses" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BudgetExpenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetExpenses" ADD CONSTRAINT "BudgetExpenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetExpenses" ADD CONSTRAINT "BudgetExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
