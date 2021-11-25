import React, { useEffect } from "react";
import Expense from "./Expense";
import { Divider, List, ListSubheader } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllExpenses, selectKeyDate } from "./expensesSlice";
import { getDateStringFromDateKey } from "../../utils";

const Expenses = ({ expenseID, setExpenseID }) => {
  const expenses = useSelector(selectAllExpenses);
  const keyDate = useSelector(selectKeyDate);

  return (
    <List>
      <ListSubheader>
        Expenses for {getDateStringFromDateKey(keyDate)}
      </ListSubheader>
      <Divider />
      {expenses.map((expense) => (
        <React.Fragment key={expense.id}>
          {" "}
          <Expense
            expense={expense}
            currentExpenseID={expenseID}
            setExpenseID={setExpenseID}
          />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Expenses;
