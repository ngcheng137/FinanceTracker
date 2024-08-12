import { Button } from "@/components/ui/button"
import React from "react"

function ExpenseIdRoute({ name, onClick }) {
    return (
        <div onClick={onClick}>
            <Button>{name}</Button>
        </div>
    )
}

export default ExpenseIdRoute