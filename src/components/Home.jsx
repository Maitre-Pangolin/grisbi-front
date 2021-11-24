import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createExpenseThunk } from "../features/Expenses/expensesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const emptyForm = {
    title: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    categoryId: "",
  };
  const [state, setState] = useState(emptyForm);

  const [error, setError] = useState({
    title: "",
    amount: "",
  });

  const handleSubmit = () => {
    if (!state.title) {
      setError((error) => ({ ...error, title: "Enter an expense title" }));
      return;
    }
    if (!state.amount || state.amount <= 0) {
      setError((error) => ({ ...error, amount: "Enter a valid amount" }));
      return;
    }
    dispatch(createExpenseThunk(state));
    setState(emptyForm);
  };

  const handleChange = ({ target }) => {
    if (error[target.name])
      setError((error) => ({ ...error, [target.name]: "" }));
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleAmountChange = ({ target }) => {
    if (error.amount) setError((error) => ({ ...error, amount: "" }));
    setState((prevState) => ({
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
        value={state.title}
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
        value={state.amount}
        onChange={handleAmountChange}
      />
      <TextField
        id='outlined-select-currency'
        select
        label='Category'
        name='categoryId'
        value={state.categoryId}
        onChange={handleChange}
        variant='standard'>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </TextField>
      <Button variant='contained' size='large' onClick={handleSubmit}>
        Add expense
      </Button>
    </div>
  );
};

export default Home;
