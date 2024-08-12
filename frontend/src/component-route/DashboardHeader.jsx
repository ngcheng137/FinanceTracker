import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardHeader() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");  
    };
    
    return <div className="p-5 shadow-sm border-b flex justify-between">
        <div>
           
        </div>
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    </div>
}   

export default DashboardHeader;    