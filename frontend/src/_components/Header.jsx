import React from "react";
import { Button } from "@/components-shd/ui/button";
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="p-5 flex justify-between items-center border shadow-md">
            {/* Logo */}
            <h2 className="text-xl font-medium text-black py-2">Time-Buck</h2>
            <Button onClick={navigateToSignup}>
                Get Started
            </Button>
        </div>
    )
}

export default Header;