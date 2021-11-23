import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import expenses from "./expenses.json";

export const handlers = [
  rest.get("/api/expenses", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expenses));
  }),
  rest.post("/api/expenses", (req, res, ctx) => {
    const expense = { ...req.body, id: uuidv4() };
    expenses.push(expense);
    return res(ctx.status(200), ctx.json(expense));
  }),
];
