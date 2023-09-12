
export interface ExpensesCardProps {
	title: string;
	date: string;
	cost: number;
	comments?: string;
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