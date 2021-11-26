import React from "react";
import { useDispatch } from "react-redux";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
    <ListItem
      sx={
        currentExpenseID === id
          ? { bgcolor: "rgba(96, 143, 231, 0.226);" }
          : null
      }>
      <ListItemAvatar>
        <Avatar>
          <AttachMoneyIcon />
        </Avatar>
      </ListItemAvatar>
      <Divider orientation='vertical' variant='fullWidth' flexItem />
      <ListItemText
        primary={title}
        secondary={categoryId ? categoryId + " match categ" : "Uncategorized"}
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
