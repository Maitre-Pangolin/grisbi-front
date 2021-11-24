import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExpensesByMonthThunk,
  selectAllExpenses,
} from "./features/Expenses/expensesSlice";
import LogicDev from "./components/LogicDev";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { fetchTotalsThunk } from "./features/Totals/totalsSlice";
import { getCurrentMonthKey } from "./utils";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTotalsThunk());
    dispatch(fetchExpensesByMonthThunk(getCurrentMonthKey()));
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dev' element={<LogicDev />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
