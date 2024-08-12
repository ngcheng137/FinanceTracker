import React from "react";  
import { CarouselOrientation } from "./Carousel";
import { Button } from "@/components-shd/ui/button";

function TaskCard(){
    return (
        <div className="grid-cols-1">
            <div className="flex flex-row gap-10 mb-5">
                <div className="border rounded-lg basis-1/2 h-24 pt-2 pl-5 bg-gradient-to-r from-purple-100 via-blue-100 to-red-100">
                    <h2 className="text-2xl font-bold text-slate-700 pt-2">3</h2>
                    <h2 className="text-sm font-bold text-slate-700 pt-1">Pending Task</h2>
                </div>
                <div className="border rounded-lg basis-1/2 h-24 pt-2 pl-5 bg-gradient-to-r from-purple-100 via-blue-100 to-red-100">
                    <h2 className="text-2xl font-bold text- pt-2">2</h2>
                    <h2 className="text-sm font-bold text-slate-600 pt-1">Pinned Task</h2>
                </div>
            </div>
            <div className="border rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-red-100 w-full">
                <CarouselOrientation/>
            </div>
        </div>
    )
}

export default TaskCard;