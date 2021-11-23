import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllExpenses } from "./features/Expenses/expensesSlice";
import { getExpenses } from "./features/Expenses/expensesSlice";

function App() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  console.log(expenses);

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
          <button onClick={() => dispatch(getExpenses())}>
            Fetch expenses
          </button>
        </header>
        {expenses.map((expense, index) => (
          <p key={index}>{expense?.name}</p>
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
