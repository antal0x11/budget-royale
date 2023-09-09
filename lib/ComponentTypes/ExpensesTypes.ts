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