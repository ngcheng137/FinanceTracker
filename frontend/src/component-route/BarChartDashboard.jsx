import React from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartDashboard({ budgets }) {
    const data = budgets.map(budget => ({
        name: budget.name,
        expense: budget.expenses.reduce((acc, curr) => acc + curr.amount, 0),
        budget: budget.amount- budget.expenses.reduce((acc, curr) => acc + curr.amount, 0),
    }));

    return (
        <div className='border rounded-lg h-full items-center'>
            <div className="w-full pt-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        width={500}
                        height={300}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        data={data}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />    
                        <Bar dataKey="expense" fill="#60A5FA" stackId="a" name="Expense" />
                        <Bar dataKey="budget" fill="#BFDBFE" stackId="a" name="Budget" />
                    </BarChart>
                </ResponsiveContainer>
            </div>  
        </div>
    );
}

export default BarChartDashboard;
