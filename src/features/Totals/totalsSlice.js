import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTotals } from "../../app/api";

export const fetchTotalsThunk = createAsyncThunk(
  "expenses/fetchTotals",
  async () => {
    const response = await fetchTotals();
    return response.data;
  }
);

const TotalsSlice = createSlice({
  name: "Totals",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalsThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default TotalsSlice.reducer;

export const selectMonthlyTotals = (state) => state.totals;
