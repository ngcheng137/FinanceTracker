import React, { useCallback, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components-shd/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";

function BudgetItem({ id, name, amount, onDeleteBudget,onExpenseAdded }) {
    const [spent, setSpent] = useState(0);
    const handleDelete = async () => {
        console.log(localStorage.getItem("token"));
        try {
            await axios.delete(`${BACKEND_URL}/budgets/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            onDeleteBudget(id);
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    };

    const fetchExpenses = useCallback(async () => {
        if (!id) return;
        
        try {
            const response = await axios.get(`${BACKEND_URL}/budgetexpenses/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setSpent(response.data.reduce((acc, expense) => acc + expense.amount, 0));
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        if (onExpenseAdded) {
            fetchExpenses(); 
        }
    }, [onExpenseAdded, fetchExpenses]);

        
    const spentPercentage = Math.min((spent / amount) * 100, 100);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-5 border rounded-lg">
                    <div className="flex gap-2 items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{name}</h2>
                            <h2 className="text-sm text-slate-400 pt-2 pb-2">{`Rs ${spent}`}</h2>
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-blue-700 pt-2">{`Rs ${amount}`}</h2>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center justify-between pb-1">
                            <h2 className="text-xs text-slate-400">Spent</h2>
                            <h2 className="text-xs text-slate-400">Budget</h2>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full">
                            <div className="bg-blue-700 h-2 rounded-full" style={{width:`${spentPercentage}%`}}></div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Budget</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button className="mt-5 w-full bg-red-600" onClick={handleDelete}>
                            Delete Budget
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BudgetItem;

