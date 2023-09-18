import { createContext } from "react";
import { CategoryContextType } from "./ComponentTypes/ExpensesTypes";

const CategoryContext = createContext<CategoryContextType | null>(null);

export default CategoryContext;