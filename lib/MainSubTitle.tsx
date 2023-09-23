import styles from "@/styles/subtitle-card.module.css";

interface Props {
    totalCost: number;
    updateAddExpense: () => void;
}

export default function MainSubTitle(props: Props) {
    return (
        <div className={styles.container}>
            <span className={styles.smallScreensAddblock}>
                <div>Total Money Spent: {props.totalCost.toFixed(2)}$</div>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={props.updateAddExpense}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </span>
        </div>
    );
}
