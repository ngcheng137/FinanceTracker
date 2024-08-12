import BudgetItem from "@/budgets/components/BudgetItem";
import { BACKEND_URL } from "@/config";
import AddExpense from "@/expenses/AddExpense";
import ExpenseIdRoute from "@/expenses/ExpenseIdRoute";
import ExpensesTable from "@/expenses/ExpensesTable";
import DashboardLayout from "@/layout/dashboard-layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Expenses({ params }) {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [budgetDetails, setBudgetDetails] = useState({});
    const [refreshBudget, setRefreshBudget] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                const response = await axios.get(`${BACKEND_URL}/budgets/${userId}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setBudgets(response.data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };
        fetchBudgets();
    },[]);

    useEffect(() => {
        if (selectedBudget) {
            const fetchExpenses = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/budgetexpenses/${selectedBudget}`, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    setExpenses(response.data);
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                }
            };
            fetchExpenses();
        }
    }, [selectedBudget, refreshBudget]);

    const handleAddExpenses = (newExpenses) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpenses]);
        setRefreshBudget(prev => !prev); 
    };

    const handleDeleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    };

    const handleBudgetClick = async (budgetId) => {
        setSelectedBudget(budgetId);
        try {
            const response = await axios.get(`${BACKEND_URL}/budgets/find/${budgetId}`, {
                headers: {
                    Authorization: token,
                },
            });
            setBudgetDetails(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching budget details:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-10">
                <h2 className="text-2xl font-bold">My Expenses</h2>
                <div className="flex justify-start p-4 gap-3">
                    {budgets.map((budget) => (
                        <ExpenseIdRoute
                            key={budget.id}
                            name={budget.name}
                            onClick={() => handleBudgetClick(budget.id)}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {selectedBudget && (
                        <BudgetItem
                            key={budgetDetails.id}
                            id = {budgetDetails.id}
                            name={budgetDetails.name}
                            amount={budgetDetails.amount}
                            onExpenseAdded={handleAddExpenses} 
                        />
                    )}
                    <AddExpense onAddExpensesOutside={handleAddExpenses} budgetId={selectedBudget} budgetDetail={budgetDetails} budget_Name={budgetDetails.name}/>
                </div>
                <div>
                    <h2 className="text-lg font-bold mt-5">Latest Expenses</h2>
                    <div className="grid grid-cols-4 bg-slate-600 mt-8">
                        <h2 className="text-lg font-bold text-white">Description</h2>
                        <h2 className="text-lg font-bold text-white">Amount</h2>
                        <h2 className="text-lg font-bold text-white">Date</h2>
                        <h2 className="text-lg font-bold text-white">Action</h2>
                    </div>
                    {expenses.map((expense) => (
                        <ExpensesTable
                            key={expense.id}
                            id={expense.id}
                            name={expense.description}
                            amount={expense.amount}
                            date={expense.date}
                            onDelete={handleDeleteExpense}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Expenses;
