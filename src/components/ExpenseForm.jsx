import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpenseThunk,
  selectExpenseByID,
  updateExpenseThunk,
} from "../features/Expenses/expensesSlice";

const ExpenseForm = ({ expenseID, setExpenseID }) => {
  const dispatch = useDispatch();
  const emptyForm = {
    id: "",
    title: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    categoryId: "",
  };
  const expense = useSelector(selectExpenseByID(expenseID));
  const [formData, setFormData] = useState(emptyForm);
  useEffect(() => {
    expense ? setFormData(expense) : setFormData(emptyForm);
    setError({ title: "", amount: "" });
  }, [expense]);

  const [error, setError] = useState({
    title: "",
    amount: "",
  });

  const handleSubmit = () => {
    let isError = false;
    if (!formData.title) {
      setError((error) => ({ ...error, title: "Enter an expense title" }));
      isError = true;
    }
    if (!formData.amount || formData.amount <= 0) {
      setError((error) => ({ ...error, amount: "Enter a valid amount" }));
      isError = true;
    }
    if (isError) return;

    expense
      ? dispatch(updateExpenseThunk(formData))
      : dispatch(createExpenseThunk(formData));
    setFormData(emptyForm);
    setExpenseID(null);
  };

  const handleClear = () => {
    if (expenseID) setExpenseID(null);
    setFormData(emptyForm);
    setError({ title: "", amount: "" });
  };

  const handleChange = ({ target }) => {
    if (error[target.name])
      setError((error) => ({ ...error, [target.name]: "" }));
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleAmountChange = ({ target }) => {
    if (error.amount) setError((error) => ({ ...error, amount: "" }));
    setFormData((prevState) => ({
      ...prevState,
      amount: parseInt(target.value, 10),
    }));
  };

  return (
    <div className='home-form-container'>
      <h1>{expense ? "Edit Expense" : "Add Expense"}</h1>
      <TextField
        id='expense-name'
        label='Expense Name'
        name='title'
        error={error.title !== ""}
        helperText={error.title}
        variant='standard'
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        id='outlined-basic'
        type='number'
        label='Amount'
        error={error.amount !== ""}
        helperText={error.amount}
        name='amount'
        variant='standard'
        value={formData.amount}
        onChange={handleAmountChange}
      />
      <TextField
        id='outlined-select-currency'
        select
        label='Category'
        name='categoryId'
        value={formData.categoryId}
        onChange={handleChange}
        variant='standard'>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </TextField>
      <TextField
        id='outlined-select-currency'
        label='Date'
        name='date'
        variant='standard'
        type='date'
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.date}
        onChange={handleChange}></TextField>

      <Button variant='contained' size='large' onClick={handleSubmit}>
        {expense ? "Update Expense" : "Create Expense"}
      </Button>
      <Button
        variant='contained'
        size='large'
        color='error'
        disabled={!(formData.title || formData.id || formData.amount)}
        onClick={handleClear}>
        Clear Form
      </Button>
    </div>
  );
};

export default ExpenseForm;
