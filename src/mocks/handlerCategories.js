import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

import categoriesJson from "./categories.json";

let categories = categoriesJson;

export const handlerCategories = [
  rest.get("/api/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  }),

  rest.post("/api/categories", (req, res, ctx) => {
    const category = { ...req.body, id: uuidv4() };
    categories.push(category);
    return res(ctx.status(200), ctx.json(category));
  }),

  rest.patch("/api/categories/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = categories.findIndex((category) => category.id === id);
    categories[index] = { id, ...req.body };
    return res(ctx.status(200), ctx.json(categories[index]));
  }),

  rest.delete("/api/categories/:id", (req, res, ctx) => {
    try {
      const { id } = req.params;
      const categoryDeleted = categories.find((category) => category.id === id);
      categories = categories.filter((expense) => expense.id !== id);
      return res(ctx.status(200), ctx.json(categoryDeleted));
    } catch (error) {
      console.log(error);
      return res(ctx.status(500));
    }
  }),
];
