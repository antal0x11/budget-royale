import styles from "@/styles/categories.module.css";

export default function Categories() {
    return (
        <div className={styles.container}>
            <h2>Categories</h2>
            <div className={styles.subContainer}>
                <input type={"text"} placeholder={"Add New Category"} />
                <button>Add Category</button>
            </div>
            <div></div>
        </div>
    )
}