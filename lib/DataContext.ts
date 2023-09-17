import { createContext } from "react";
import { DataContextType } from "./ComponentTypes/ExpensesTypes";

const DataContext = createContext<DataContextType | null>(null);

export default DataContext;
