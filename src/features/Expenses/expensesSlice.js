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
  keyDate: "2021-11",
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
  async (keyDate) => {
    const response = await fetchExpensesByMonth(keyDate);
    //console.log("In async thunk", response);
    return { data: response.data, keyDate };
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
  async (updatedExpense, thunkAPI) => {
    const response = await updateExpenses(updatedExpense); // should be better to separate id from expense form sent data ...
    const { expenses } = thunkAPI.getState();
    const prevExpense = expenses.expenses.find(
      ({ id }) => id === response.data.id
    );
    const prevKey = getMonthKeyFromDateString(prevExpense.date);
    const updatedKey = getMonthKeyFromDateString(response.data.date);
    thunkAPI.dispatch(
      decreaseTotal({ key: prevKey, amount: prevExpense.amount })
    );
    thunkAPI.dispatch(
      increaseTotal({ key: updatedKey, amount: response.data.amount })
    );

    return response.data;
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    const response = await deleteExpenses(id);
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
      state.keyDate = action.payload.keyDate;
      state.expenses = action.payload.data;
    });

    builder.addCase(createExpenseThunk.fulfilled, (state, action) => {
      if (getMonthKeyFromDateString(action.payload.date) === state.keyDate)
        state.expenses.push(action.payload);
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
      if (
        getMonthKeyFromDateString(state.expenses[index].date) !==
        getMonthKeyFromDateString(action.payload.date)
      ) {
        state.expenses.splice(index, 1);
      } else {
        state.expenses[index] = action.payload;
      }
    });
  },
});

export default expensesSlice.reducer;

export const selectAllExpenses = (state) => state.expenses.expenses;
export const selectExpenseByID = (expenseID) => (state) =>
  expenseID ? state.expenses.expenses.find(({ id }) => id === expenseID) : null;
export const selectKeyDate = (state) => state.expenses.keyDate;
