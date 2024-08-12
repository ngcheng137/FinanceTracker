import React from "react";

function InnerTaskCard({ content }) {
    return (
        <div className="bg-white w-full h-20 shadow-md shadow-blue-200">
            <div className="flex items-center justify-between p-1">
                <div>
                    <h2 className="text-xl font-bold text-slate-700 pb-1">{content.title}</h2>
                    <h2 className="text-xs font-bold text-slate-700">{content.description}</h2>  
                </div>
            </div>
        </div>
    )
}   

export default InnerTaskCard;