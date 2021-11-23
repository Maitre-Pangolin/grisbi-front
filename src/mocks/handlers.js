import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import expensesJson from "./expenses.json";

let expenses = expensesJson;

export const handlers = [
  rest.get("/api/expenses", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expenses));
  }),

  rest.post("/api/expenses", (req, res, ctx) => {
    const expense = { id: uuidv4(), ...req.body };
    expenses.push(expense);
    return res(ctx.status(200), ctx.json(expense));
  }),

  rest.delete("/api/expenses/:id", (req, res, ctx) => {
    try {
      const { id } = req.params;
      expenses = expenses.filter((expense) => expense.id !== id);
      return res(ctx.status(200), ctx.json(id));
    } catch (error) {
      console.log(error);
      return res(ctx.status(500));
    }
  }),
];
