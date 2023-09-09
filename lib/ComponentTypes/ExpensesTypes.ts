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
}

export interface NewExpense {
	cancel : ReturnType<typeof React.useState<boolean>>
}