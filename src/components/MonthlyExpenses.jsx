import React, { useState } from "react";
import Expenses from "../features/Expenses/Expenses";
import { Grid, Container, Box } from "@mui/material";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import {
  selectCurrentMonthTotals,
  selectTotalByKeyDate,
} from "../features/Totals/totalsSlice";
import { getCurrentMonthKey } from "../utils";
import { selectKeyDate } from "../features/Expenses/expensesSlice";

const MonthlyExpenses = () => {
  const [expenseID, setExpenseID] = useState(null);
  const keyDate = useSelector(selectKeyDate);
  const total = useSelector(selectTotalByKeyDate(keyDate));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Expenses setExpenseID={setExpenseID} expenseID={expenseID} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={4} paddingX={"40px"}>
            <Grid item xs={12} md={12}>
              <h1>Total for month : {total}</h1>
            </Grid>
            <Grid item xs={12} md={12}>
              <ExpenseForm expenseID={expenseID} setExpenseID={setExpenseID} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyExpenses;
