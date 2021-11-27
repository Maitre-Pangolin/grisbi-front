import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteExpenseThunk } from "./expensesSlice";
import { selectCategoryById } from "../Categories/categorySlice";

import { categoriesIconBank } from "../Categories/categorySlice";

const Expense = ({ expense, currentExpenseID, setExpenseID }) => {
  const { id, title, date, categoryId, amount } = expense;
  const category = useSelector(selectCategoryById(categoryId));
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (currentExpenseID === id) {
      console.log("OUI");
      setExpenseID(null);
    }
    dispatch(deleteExpenseThunk(id));
  };

  return (
    <ListItem
      sx={
        currentExpenseID === id
          ? { bgcolor: "rgba(96, 143, 231, 0.226);" }
          : null
      }>
      <ListItemAvatar>
        <Avatar>{categoriesIconBank[category?.iconIndex || 0] || null}</Avatar>
      </ListItemAvatar>
      <Divider orientation='vertical' variant='fullWidth' flexItem />
      <ListItemText
        primary={title}
        secondary={category?.name || "Miscelleanous"}
        sx={{ marginLeft: "20px" }}
      />
      <ListItemText
        primary={amount + " CAD"}
        secondary={date}
        sx={{ marginRight: "20px", textAlign: "right" }}
      />
      <Divider orientation='vertical' variant='fullWidth' flexItem />
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton
          color='primary'
          onClick={() => setExpenseID(expense.id)}
          disabled={id === currentExpenseID}>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton
          color='error'
          onClick={handleDelete}
          disabled={id === currentExpenseID}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Expense;
