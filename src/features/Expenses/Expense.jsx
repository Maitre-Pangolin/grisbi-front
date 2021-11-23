import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpenseThunk } from "./expensesSlice";

const Expense = ({ expense }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px black solid", margin: "20px", padding: "10px" }}>
      <p>{expense?.name}</p>
      <p>{expense?.amount}</p>
      <p>{expense?.date}</p>
      <button onClick={() => dispatch(deleteExpenseThunk(expense.id))}>
        Delete
      </button>
    </div>
  );
};

export default Expense;
