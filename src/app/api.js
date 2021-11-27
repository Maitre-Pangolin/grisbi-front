import axios from "axios";

const expenses = "/api/expenses";
const totals = "/api/totals";
const categories = "/api/categories";

export const fetchExpenses = () => axios.get(expenses);
export const fetchExpensesByMonth = (yearMonth) =>
  axios.get(`${expenses}/${yearMonth}`);
export const createExpenses = (expense) => axios.post(expenses, expense);
export const updateExpenses = (expense) =>
  axios.patch(`${expenses}/${expense.id}`, expense);
export const deleteExpenses = (id) => axios.delete(`${expenses}/${id}`);

export const fetchTotals = () => axios.get(totals);

export const fetchCategories = () => axios.get(categories);
export const createCategories = (category) => axios.post(categories, category);
export const updateCategories = (id, category) =>
  axios.get(categories, id, category);
export const deleteCategories = (id) => axios.get(categories, id);
