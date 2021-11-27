import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import MonthlyExpenses from "./components/MonthlyExpenses";

import { fetchTotalsThunk } from "./features/Totals/totalsSlice";
import { fetchCategoriesThunk } from "./features/Categories/categorySlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTotalsThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/months/:keyDate' element={<MonthlyExpenses />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
