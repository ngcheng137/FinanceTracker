import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/dashboard-layout";
import CardInfo from "@/component-route/CardInfo";
import BarChartDashboard from "@/component-route/BarChartDashboard";
import TaskCard from "@/component-route/TaskCard";
import { Button } from "@/components-shd/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import DashboardTable from "@/expenses/DashboardTable";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [noBudget, setNoBudget] = useState(0);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            return;
        }
        const decodedToken = jwtDecode(token);
        const userIdFromToken = decodedToken.id;
        setUserId(userIdFromToken);
        setUserName(decodedToken.name);
        async function fetchData() {
            try {
                if(!userId){
                    return;
                }
                const budgetsResponse = await axios.get(`${BACKEND_URL}/budgets/${userId}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                const fetchedBudgets = budgetsResponse.data;


                const total = fetchedBudgets.reduce((sum, budget) => sum + budget.amount, 0);
                setTotalBudget(total);
                setNoBudget(fetchedBudgets.length);


                const budgetsWithExpenses = await Promise.all(
                    fetchedBudgets.map(async (budget) => {
                        const expensesResponse = await axios.get(`${BACKEND_URL}/budgetexpenses/${budget.id}`, {
                            headers: {
                                Authorization: localStorage.getItem("token"),
                            },
                        });
                        return {
                            ...budget,
                            expenses: expensesResponse.data,
                        };
                    })
                );
                setBudgets(budgetsWithExpenses);

                const expensesResponse = await axios.get(`${BACKEND_URL}/expenses/${userId}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setExpenses(expensesResponse.data);

                const totalExpenses = expensesResponse.data.reduce((sum, expense) => sum + expense.amount, 0);
                setTotalExpense(totalExpenses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [token,userId,userName]);

    return (
        <DashboardLayout>
            <div>
                <h2 className="p-2 text-2xl font-bold">{`Hi, ${userName}!`}</h2>
            </div>
            <div className="p-3">
                <CardInfo BudgetTotal={totalBudget} ExpenseTotal={totalExpense} NoBudget={noBudget} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-3 gap-5 mt-6">
                <div className="h-full">
                    <h2 className="text-2xl font-extrabold pb-4">Finance</h2>
                    <BarChartDashboard budgets={budgets} />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold pb-4">Task</h2>
                    <div className="grid grid-cols-1 items-center">
                        <div className="border-1 rounded-lg pb-16">
                            <TaskCard />
                        </div>
                        <Button>Go to Task</Button>
                    </div>
                </div>
            </div>
            <div className="mt-20 p-5">
                <h2 className="text-2xl font-extrabold pb-4">Recent Expenses</h2>
                <div className="grid grid-cols-4 bg-slate-600 mt-8">
                    <h2 className="text-lg font-bold text-white">Description</h2>
                    <h2 className="text-lg font-bold text-white">Amount</h2>
                    <h2 className="text-lg font-bold text-white">Date</h2>
                    <h2 className="text-lg font-bold text-white">BudgetName</h2>
                </div>
                {expenses.map((expense) => (
                    <DashboardTable
                        key={expense.id}
                        id={expense.id}
                        name={expense.description}
                        amount={expense.amount}
                        date={expense.date}
                        budgetName={expense.budgetName}
                    />
                ))}
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
