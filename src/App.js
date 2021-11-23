import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllExpenses } from "./features/Expenses/expensesSlice";
import {
  fetchExpensesThunk,
  createExpenseThunk,
} from "./features/Expenses/expensesSlice";
import Expense from "./features/Expenses/Expense";

function App() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  const newExpense = {
    name: "From Post",
    amount: 20,
    date: "2021-11-01",
    categoryId: 1,
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <header>
          <Link to='/'>
            <button>Home</button>
          </Link>
          <Link to='/test'>
            <button>Test</button>
          </Link>
          <button onClick={() => dispatch(fetchExpensesThunk())}>
            Fetch expenses
          </button>
          <button onClick={() => dispatch(createExpenseThunk(newExpense))}>
            Post expense
          </button>
        </header>
        {expenses.map((expense, index) => (
          <Expense key={index} expense={expense} />
        ))}
        <Routes>
          <Route path='/' element={<h1>Hi</h1>} />
          <Route path='/test' element={<h1>Test</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
