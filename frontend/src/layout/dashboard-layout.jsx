import DashboardHeader from "@/component-route/DashboardHeader";
import SideNav from "@/component-route/SideNav";
import React from "react"; 

function DashboardLayout({children}){
    return <div>
        <div className="fixed md:w-64 hidden md:block">
            < SideNav />
        </div>
        <div className="md:ml-64">
            <DashboardHeader/>
            {children}  
        </div>
    </div>
}

export default DashboardLayout;