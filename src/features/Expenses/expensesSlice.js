import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchExpenses } from "../../app/api";

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

export const getExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async () => {
    const response = await fetchExpenses();
    console.log("In async thunk", response);
    return response.data;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.status = "idle";
        state.expenses = action.payload;
      });
  },
});

export default expensesSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
