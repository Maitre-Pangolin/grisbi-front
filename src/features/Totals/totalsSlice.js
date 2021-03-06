import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTotals } from "../../app/api";
import { getCurrentMonthKey } from "../../utils";

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
  reducers: {
    increaseTotal(state, action) {
      const { key, amount } = action.payload;
      if (key in state) {
        state[key] += amount;
      } else {
        state[key] = amount;
      }
    },
    decreaseTotal(state, action) {
      const { key, amount } = action.payload;
      if (key in state) state[key] -= amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotalsThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default TotalsSlice.reducer;
export const { increaseTotal, decreaseTotal } = TotalsSlice.actions;

export const selectMonthlyTotals = (state) => state.totals; //SHOULD RETURN AN ORDERED ARRAY OF [{dateKey,totals}]
export const selectCurrentMonthTotals = (state) => {
  const yearMonthKey = getCurrentMonthKey();
  return state.totals[yearMonthKey];
};
export const selectTotalByKeyDate = (keyDate) => (state) =>
  state.totals[keyDate];
