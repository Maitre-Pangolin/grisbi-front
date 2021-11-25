import React from "react";
import ExpenseForm from "./ExpenseForm";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth='sm'>
      <ExpenseForm />
    </Container>
  );
};

export default Home;
