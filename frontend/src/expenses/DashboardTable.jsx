import React from "react";

function DashboardTable({ id, name, amount, date, budgetName }) {
    return (
        <div className="mt-3">
            <div className="grid grid-cols-4 bg-slate-100">
                <h2>{name}</h2>
                <h2>{amount}</h2>
                <h2>{date}</h2>
                <h2>{budgetName}</h2>
            </div>
        </div>
    )
}

export default DashboardTable;