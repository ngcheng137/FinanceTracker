import React, { useEffect } from "react";
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

function SideNav() {
    const navigate = useNavigate();
    const menuList = [{
        id:1,
        name: "Dashboard",
        icon: LayoutGrid,
        path: "/dashboard"
    },{
        id:2,
        name: "Budgets",
        icon: PiggyBank,
        path: "/dashboard/budgets"
    },{
        id:3,
        name:"Expenses",
        icon: ReceiptText,
        path: "/dashboard/expenses"
    }]

    return <div className="h-screen border shadow-sm">
        <div className="p-4 pl-8 text-xl font-medium text-black">
            Time Buck
        </div>
        <div className="mt-5">
            {menuList.map((menu,index) => (
                <h2 key = {menu.id} className="p-5 flex gap-2 items-center text-gray-500 font-medium cursor-pointer rounded-md hover:text-blue-800 hover:bg-blue-100"
                onClick={()=>navigate(menu.path)}>
                    <menu.icon/>
                    {menu.name}
                </h2>
            ))}
        </div>
    </div>
}

export default SideNav;