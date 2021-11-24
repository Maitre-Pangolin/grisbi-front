import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExpensesByMonthThunk,
  selectAllExpenses,
} from "../features/Expenses/expensesSlice";
import {
  fetchExpensesThunk,
  createExpenseThunk,
} from "../features/Expenses/expensesSlice";
import Expense from "../features/Expenses/Expense";
import ExpenseForm from "./ExpenseForm";

const LogicDev = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  const newExpense = {
    name: "From Post",
    amount: 20,
    date: "2021-11-01",
    categoryId: 1,
  };
  return (
    <div>
      <header>
        <button onClick={() => dispatch(fetchExpensesThunk())}>
          Fetch expenses
        </button>
        <button onClick={() => dispatch(createExpenseThunk(newExpense))}>
          Post expense
        </button>
        <button onClick={() => dispatch(fetchExpensesByMonthThunk("2021-11"))}>
          Fetch November 2021
        </button>
        <button onClick={() => dispatch(fetchExpensesByMonthThunk("2021-10"))}>
          Fetch October 2021
        </button>
      </header>
      {expenses.map((expense, index) => (
        <Expense key={index} expense={expense} />
      ))}
      <ExpenseForm />
    </div>
  );
};

export const FormYearMonth = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  return (
    <div>
      input
      <input type='month' name='' id='' />
    </div>
  );
};

export default LogicDev;
