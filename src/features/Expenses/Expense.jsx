import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpenseThunk, updateExpenseThunk } from "./expensesSlice";

const Expense = ({ expense }) => {
  const dispatch = useDispatch();
  const updatedExpense = {
    title: "Updated",
    amount: 750,
    date: "2020-11-01",
    categoryId: 1,
  };
  return (
    <div style={{ border: "1px black solid", margin: "20px", padding: "10px" }}>
      <p>{expense?.title}</p>
      <p>{expense?.amount}</p>
      <p>{expense?.date}</p>
      <button onClick={() => dispatch(deleteExpenseThunk(expense.id))}>
        Delete
      </button>
      <button
        onClick={() =>
          dispatch(updateExpenseThunk({ id: expense.id, ...updatedExpense }))
        }>
        Update
      </button>
    </div>
  );
};

export default Expense;
