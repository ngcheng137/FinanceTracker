import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function DemoRoute(){
    const demoToken = ""
    const navigate = useNavigate(); 
    function handleAccess(){
        localStorage.setItem("token", demoToken);
        navigate("/dashboard");
    }
    return (
        <div>
            <Button onClick={handleAccess}>Click to Access Demo Account</Button>
        </div>
    )
}

export default DemoRoute;   
