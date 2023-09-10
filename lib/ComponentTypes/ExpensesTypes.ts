import * as React from "react";

export interface ExpensesCardProps {
	title: string;
	date: string;
	cost: number;
	comments?: string;
}

export interface CategoryItem {
	title: string;
	color: string;
	deleteCategoryItem? : ReturnType<typeof React.useState<CategoryItem [] | undefined>>;
}

export interface NewExpense {
	cancel : ReturnType<typeof React.useState<boolean>>
}

export interface Notification {
	msg : string;
	display : boolean;
}

export interface NotificationCommand {
	type : string;
}

export interface ExpensesObject {
	category : CategoryItem;
	items : ExpensesCardProps [];
}

export interface DataContextType {
    data : ExpensesObject[];
    updateData : (action : any, newCat?: CategoryItem, newCard? : ExpensesCardProps) => void;
}