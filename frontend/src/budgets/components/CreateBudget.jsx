"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components-shd/ui/button";
import { BACKEND_URL } from "../../config";
import axios from "axios";

function CreateBudget({ onAddBudget }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const oncreateBudget = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/budgets`,
                {
                    amount: Number(amount),
                    name: name,
                    period: "default",
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log("Budget created:", response.data);
            onAddBudget(response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error creating budget:", error);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            setName("");
            setAmount("");
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-slate-50 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
                        <h2 className="text-3xl">+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <div className="pb-3">
                                    <h2 className="pb-1 text-black font-medium my-1">Budget Name</h2>
                                    <Input
                                        type="text"
                                        placeholder="eg. Home Decor"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <h2 className="pb-1 text-black font-medium my-1">Budget Amount</h2>
                                    <Input
                                        type="number"
                                        placeholder="eg. Rs 1000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={oncreateBudget}
                                className="mt-5 w-full"
                            >
                                Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateBudget;
