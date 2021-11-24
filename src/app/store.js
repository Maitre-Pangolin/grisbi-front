import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/Expenses/expensesSlice";
import totalsReducer from "../features/Totals/totalsSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    totals: totalsReducer,
  },
});
