import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components-shd/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";

function AddExpense({ onAddExpensesOutside, budgetId, budget_Name }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (budget_Name) {
            setName(`${budget_Name} Expense`);
        }
    }, [budget_Name]);

    const onaddExpense = async () => {
        const currentDate = new Date().toISOString();
        const response = await axios.post(`${BACKEND_URL}/budgetexpenses`, {
            amount: Number(amount),
            date: currentDate,
            description: name,
            budgetId: budgetId,
            budgetName: budget_Name
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        console.log("Expense created:", response.data);
        onAddExpensesOutside(response.data);
    };
    
    return (
        <div className="border p-5 rounded-lg">
            <h2 className="text-lg font-bold">Add Expense</h2>
            <div className="pb-3">
                <h2 className="pb-1 text-black font-medium my-1">Expense Name</h2>
                <Input
                    type="text"
                    value={name}
                    placeholder="eg. Home Decor"
                    onChange={(e) => setName(e.target.value)} />
            </div> 
            <div className="pb-3">
                <h2 className="pb-1 text-black font-medium my-1">Amount</h2>
                <Input
                    type="number"
                    placeholder="eg. 1000"
                    onChange={(e) => setAmount(e.target.value)} />
            </div> 
            <Button 
                disabled={!(name)} 
                className="w-full"
                onClick={onaddExpense}>
                    Add new Expense
            </Button>
        </div>
    )
}

export default AddExpense;
