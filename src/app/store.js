import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/Expenses/expensesSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
