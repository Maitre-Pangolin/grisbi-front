import React, { useState, useEffect } from "react";
import Expenses from "../features/Expenses/Expenses";
import { Grid, Box, Divider, ListSubheader, List } from "@mui/material";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import { getDateStringFromDateKey } from "../utils";
import { fetchExpensesByMonthThunk } from "../features/Expenses/expensesSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { selectTotalByKeyDate } from "../features/Totals/totalsSlice";

const MonthlyExpenses = () => {
  const { keyDate } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpensesByMonthThunk(keyDate));
  }, [dispatch, keyDate]);

  const [expenseID, setExpenseID] = useState(null);

  return (
    <Box sx={{ flexGrow: 1, flexWrap: "wrap-reverse" }}>
      <Grid container spacing={4} flexWrap='wrap-reverse'>
        <Grid item xs={12} md={8}>
          <Expenses setExpenseID={setExpenseID} expenseID={expenseID} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={4} paddingX={"40px"}>
            <Grid item xs={12} md={12}>
              <MonthTotal />
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

const MonthTotal = () => {
  const { keyDate } = useParams();
  const total = useSelector(selectTotalByKeyDate(keyDate));
  const budget = 1500; /// use selector budger
  return (
    <List>
      <ListSubheader>
        Total for {getDateStringFromDateKey(keyDate)}
      </ListSubheader>

      <Divider />
      <h2 style={{ textAlign: "center" }}>
        <span style={{ color: total > budget ? "red" : "green" }}>
          {total?.toFixed(2)}
        </span>{" "}
        / {budget?.toFixed(0)} CAD
      </h2>
      <h3 style={{ textAlign: "center" }}>
        ( {total > budget ? "" : "+"}
        {budget - total} )
      </h3>
      <Divider />
    </List>
  );
};

export default MonthlyExpenses;
