import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function DemoRoute(){
    const demoToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkRlbW8gQWNjb3VudCJ9.wV31urM7wY35cs9bfCqCFUnhiVwzVlFm6FDHyQgmYN4"
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