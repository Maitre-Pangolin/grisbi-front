import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllExpenses } from "./features/Expenses/expensesSlice";
import LogicDev from "./components/LogicDev";

function App() {
  return (
    <BrowserRouter>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/dev'>
        <button>Dev</button>
      </Link>
      <div className='App'>
        <Routes>
          <Route path='/' element={<h1>Hi</h1>} />
          <Route path='/dev' element={<LogicDev />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
