import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import expensesJson from "./expenses.json";

let expenses = expensesJson;

export const handlerExpenses = [
  rest.get("/api/expenses", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expenses));
  }),

  rest.get("/api/expenses/:yearMonth", (req, res, ctx) => {
    const { yearMonth } = req.params;
    const monthlyExpenses = expenses.filter(({ date }) => {
      return date.slice(0, 7) === yearMonth;
    });
    return res(ctx.status(200), ctx.json(monthlyExpenses));
  }),

  rest.post("/api/expenses", (req, res, ctx) => {
    const expense = { ...req.body, id: uuidv4() };
    expenses.push(expense);
    return res(ctx.status(200), ctx.json(expense));
  }),

  rest.patch("/api/expenses/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = expenses.findIndex((expense) => expense.id === id);
    expenses[index] = { id, ...req.body };
    return res(ctx.status(200), ctx.json(expenses[index]));
  }),

  rest.delete("/api/expenses/:id", (req, res, ctx) => {
    try {
      const { id } = req.params;
      const expense = expenses.find((exp) => exp.id === id);
      expenses = expenses.filter((expense) => expense.id !== id);
      return res(ctx.status(200), ctx.json(expense));
    } catch (error) {
      console.log(error);
      return res(ctx.status(500));
    }
  }),

  rest.get("/api/totals", (req, res, ctx) => {
    const totals = {};
    expenses.forEach((expense) => {
      const key = expense.date.slice(0, 7);
      if (key in totals) {
        totals[key] += expense.amount;
      } else {
        totals[key] = expense.amount;
      }
    });
    //console.log(totals);
    return res(ctx.status(200), ctx.json(totals));
  }),
];
