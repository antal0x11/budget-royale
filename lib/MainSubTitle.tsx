import styles from "@/styles/subtitle-card.module.css";

type Props = {
    totalCost : number,
    selectedCategory: string
}

export default function MainSubTitle(props : Props) {
    return (
        <div className={styles.container}>
            <div>Total Money Spent: {props.totalCost}$</div>
            <div>Category: {props.selectedCategory}</div>
        </div>
    )
}