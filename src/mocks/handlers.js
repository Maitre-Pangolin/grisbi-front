import { handlerExpenses } from "./handlerExpenses";
import { handlerCategories } from "./handlerCategories";

export const handlers = [...handlerExpenses, ...handlerCategories];
