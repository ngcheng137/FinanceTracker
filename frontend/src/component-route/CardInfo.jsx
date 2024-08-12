import { Icon, PiggyBank, PiggyBankIcon, ReceiptTextIcon, Wallet2Icon } from "lucide-react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardInfo({ BudgetTotal , ExpenseTotal ,NoBudget }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
      <div className="p-7 border rounded-lg ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm pb-2">Total Budget</h2>
            <div className="font-bold text-2xl">
              {`Rs ${BudgetTotal}`}
            </div>
          </div>
          <div><PiggyBankIcon className="bg-green-500 p-3 h-12 w-12 rounded-full text-white"/></div>
        </div>
      </div>
      <div className="p-7 border rounded-lg ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm pb-2">Total Expenses</h2>
            <div className="font-bold text-2xl">
              {`Rs ${ExpenseTotal}`}
            </div>
          </div>
          <div><ReceiptTextIcon className="bg-red-500 p-3 h-12 w-12 rounded-full text-white"/></div>
        </div>
      </div>
      <div className="p-7 border rounded-lg ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm pb-2">No of Budget</h2>
            <div className="font-bold text-2xl">
              {`${NoBudget}`}
            </div>
          </div>
          <div><Wallet2Icon className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white"/></div>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;