import DashboardLayout from "../layout/dashboard-layout";
import BudgetList from "../budgets/components/BudgetList";
import React from "react";

function Budget() {
    return<DashboardLayout>
            <h2 className="font-bold text-3xl p-10">
                My Budgets
            </h2>
            <BudgetList/>
        </DashboardLayout>
}   

export default Budget;