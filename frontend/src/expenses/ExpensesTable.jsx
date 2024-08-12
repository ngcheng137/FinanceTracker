import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Trash } from "lucide-react";
import React from "react";

function ExpensesTable({ id, name, amount, date, onDelete }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/budgetexpenses/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });
            console.log("Expense deleted");
            if (onDelete) {
                onDelete(id);
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };
    return (
        <div className="mt-3">
            <div className="grid grid-cols-4 bg-slate-100">
                <h2>{name}</h2>
                <h2>{amount}</h2>
                <h2>{date}</h2>
                <h2>
                    <Trash className="text-red-500" onClick={handleDelete} />
                </h2>
            </div>
        </div>
    )
}

export default ExpensesTable;