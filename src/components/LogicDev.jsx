import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExpensesByMonthThunk,
  selectAllExpenses,
  fetchExpensesThunk,
  createExpenseThunk,
} from "../features/Expenses/expensesSlice";
import Expense from "../features/Expenses/Expense";
import ExpenseForm from "./ExpenseForm";
import {
  fetchTotalsThunk,
  selectCurrentMonthTotals,
  selectMonthlyTotals,
} from "../features/Totals/totalsSlice";
import { getDateStringFromDateKey } from "../utils";

const LogicDev = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  const newExpense = {
    title: "From Post",
    amount: 20,
    date: "2021-11-01",
    categoryId: 1,
  };
  const totals = useSelector(selectMonthlyTotals);
  const currentTotal = useSelector(selectCurrentMonthTotals);
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
        <button onClick={() => dispatch(fetchTotalsThunk())}>Log totals</button>
      </header>
      {expenses.map((expense, index) => (
        <Expense key={index} expense={expense} />
      ))}
      {Object.keys(totals).map((key) => (
        <h2 key={key}>
          {getDateStringFromDateKey(key)}: {totals[key].toFixed(2) || "-"}
        </h2>
      ))}
      <h2>{currentTotal || "No expenses"}</h2>
    </div>
  );
};

export default LogicDev;
