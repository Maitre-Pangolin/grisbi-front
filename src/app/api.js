import axios from "axios";

const expenses = "/api/expenses";
const totals = "/api/totals";
const category = "/api/category";

export const fetchExpenses = () => axios.get(expenses);
export const fetchExpensesByMonth = (yearMonth) =>
  axios.get(`${expenses}/${yearMonth}`);
export const fetchTotals = () => axios.get(totals);
export const createExpenses = (expense) => axios.post(expenses, expense);
export const updateExpenses = (expense) =>
  axios.patch(`${expenses}/${expense.id}`, expense);
export const deleteExpenses = (id) => axios.delete(`${expenses}/${id}`);
