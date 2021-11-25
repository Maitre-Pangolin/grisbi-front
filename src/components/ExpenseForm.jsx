import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpenseThunk,
  selectExpenseByID,
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
    if (expense) setFormData(expense);
    if (!expense) setFormData(emptyForm);
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
    dispatch(createExpenseThunk(formData));
    setFormData(emptyForm);
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
      <h1>Add Expense</h1>
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
        Add expense
      </Button>
    </div>
  );
};

export default ExpenseForm;
