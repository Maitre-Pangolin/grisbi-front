import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchExpenses,
  createExpenses,
  deleteExpenses,
  updateExpenses,
  fetchExpensesByMonth,
} from "../../app/api";
import { getMonthKeyFromDateString } from "../../utils";
import { increaseTotal, decreaseTotal } from "../Totals/totalsSlice";

const initialState = {
  expenses: [
    {
      id: "c3124ffc-c5d7-466c-b787-df78e456c8ca",
      title: "Test",
      amount: 750,
      date: "2021-11-01",
      categoryId: 1,
    },
  ],
};

export const fetchExpensesThunk = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await fetchExpenses();
    //console.log("In async thunk", response);
    return response.data;
  }
);

export const fetchExpensesByMonthThunk = createAsyncThunk(
  "expenses/fetchExpensesByMonth",
  async (yearMonth) => {
    const response = await fetchExpensesByMonth(yearMonth);
    //console.log("In async thunk", response);
    return response.data;
  }
);

export const createExpenseThunk = createAsyncThunk(
  "expenses/createExpense",
  async (expense, thunkAPI) => {
    const response = await createExpenses(expense);
    const key = getMonthKeyFromDateString(response.data.date);
    const amount = response.data.amount;
    thunkAPI.dispatch(increaseTotal({ key, amount }));
    return response.data;
  }
);

export const updateExpenseThunk = createAsyncThunk(
  "expenses/updateExpense",
  async (expense) => {
    const response = await updateExpenses(expense);
    return response.data;
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    console.log("In thunk");
    const response = await deleteExpenses(id);
    console.log(response);
    const key = getMonthKeyFromDateString(response.data.date);
    const amount = response.data.amount;
    thunkAPI.dispatch(decreaseTotal({ key, amount }));
    return response.data.id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchExpensesThunk.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });

    builder.addCase(fetchExpensesByMonthThunk.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });

    builder.addCase(createExpenseThunk.fulfilled, (state, action) => {
      state.expenses.push(action.payload);
      increaseTotal();
    });

    builder.addCase(deleteExpenseThunk.fulfilled, (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    });

    builder.addCase(updateExpenseThunk.fulfilled, (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.expenses[index] = action.payload;
    });
  },
});

export default expensesSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
