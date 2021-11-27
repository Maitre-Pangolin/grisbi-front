import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/Expenses/expensesSlice";
import totalsReducer from "../features/Totals/totalsSlice";
import categoryReducer from "../features/Categories/categorySlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    totals: totalsReducer,
    categories: categoryReducer,
  },
});
