import React from "react";
import { useState } from "react";

const expenseForm = () => {
  const handleChange = ({ target }) => {
    console.log(target.name, target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log();
  };

  return (
    <div>
      <form>
        <input type='text' name='text-test' id='' onChange={handleChange} />
        <input type='date' name='date' id='' onChange={handleChange} />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default expenseForm;
