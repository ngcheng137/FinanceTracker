import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { jwtDecode } from "jwt-decode";

function BudgetList() {
    const [budgets, setBudgets] = useState([]);
    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        const fetchBudgets = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/budgets/${userId}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setBudgets(response.data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };
        fetchBudgets();
    }, [token,userId]);

    const handleAddBudget = (newBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    const handleDeleteBudget = (id) => {
        setBudgets((prevBudgets) => prevBudgets.filter(budget => budget.id !== id));
    };

    return (
        <div className="p-10 pl-20 pr-20">
            <div className="gap-5 grid grid-cols-1 md:grid-col-2 lg:grid-cols-3">
                <CreateBudget onAddBudget={handleAddBudget} />
                {budgets.map((budget) => (
                    <BudgetItem 
                        key={budget.id}
                        id={budget.id}
                        name={budget.name}
                        amount={budget.amount}
                        onDeleteBudget={handleDeleteBudget}
                    />
                ))}
            </div>
        </div>
    );
}

export default BudgetList;
