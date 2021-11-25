import React from "react";
import { useDispatch } from "react-redux";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteExpenseThunk } from "./expensesSlice";

const Expense = ({ expense, currentExpenseID, setExpenseID }) => {
  const { id, title, date, categoryId, amount } = expense;
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (currentExpenseID === id) {
      console.log("OUI");
      setExpenseID(null);
    }
    dispatch(deleteExpenseThunk(id));
  };

  return (
    <ListItem>
      <ListItemText
        primary={title}
        secondary={categoryId ? categoryId + " match categ" : "Uncategorized"}
      />
      <ListItemText
        primary={amount + " CAD"}
        secondary={date}
        style={{ textAlign: "right" }}
      />
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton color='primary' onClick={() => setExpenseID(expense.id)}>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton color='error' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Expense;
