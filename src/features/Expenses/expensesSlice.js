import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchExpenses, createExpenses } from "../../app/api";

const initialState = {
  status: "idle",
  expenses: [
    {
      id: "c3124ffc-c5d7-466c-b787-df78e456c8ca",
      name: "Test",
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

export const createExpensesThunk = createAsyncThunk(
  "expenses/createExpenses",
  async (expense) => {
    const response = await createExpenses(expense);
    return response.data;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.expenses = action.payload;
      });

    builder.addCase(createExpensesThunk.fulfilled, (state, action) => {
      state.expenses.push(action.payload);
    });
  },
});

export default expensesSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
