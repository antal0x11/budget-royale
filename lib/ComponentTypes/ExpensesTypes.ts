
export interface ExpensesCardProps {
	title: string;
	date: string;
	cost: number;
}

export interface CategoryItem {
	title: string;
	color: string;
	active: boolean;
}

export interface ExpenseValue {
	addExpense?: boolean;
	updateAddExpense : () => void
}

export interface NewExpense {
	value : ExpenseValue;
}

export interface Notification {
	msg : string;
	display : boolean;
	severity: string
}

export interface ActionOptions {
	type : string;
}

export interface ExpensesObject {
	category : CategoryItem;
	items : ExpensesCardProps [];
}

export interface DataContextType {
    data : ExpensesObject[];
    updateData : (action : ActionOptions, newCat?: CategoryItem | null, newCard? : ExpensesCardProps | null) => void;
}

export interface CategoryContextType {
	categoryInfo : string;
	updateCategoryInfo : (selectedCategory : string)  => void;
}