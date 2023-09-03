import styles from "@/styles/new-expense-form.module.css";

export default function NewExpense() {
    return (
        <div>
            <form className={styles.addItem} action={"#"} method={"POST"} >
                <label htmlFor={"title"}>Title: </label>
                <input className={styles.inputBoxN} id={"title"} type={"text"} name={"title"} placeholder={"Name your expense"} required={true} />
            
                <label htmlFor={"date"}>Date: </label>
                <input className={styles.inputBoxN} id={"date"} type={"date"} name={"selected-date"} placeholder={"Select day"} required={true} />

                <label htmlFor={"cost"}>Cost: </label>
                <input className={styles.inputBoxN} id={"cost"} type={"cost"} name={"cost"} placeholder={"Price Tag"} required={true} />

                <label htmlFor={"comments"}>Comments: </label>
                <textarea className={styles.inputBoxN} id={"comments"} name={"comments"} rows={4} cols={40} placeholder={"Write a comment relative to your expense"} autoComplete={"off"} />
            
                <input className={styles.inputSubmit} type={"submit"} value={"Add Expense"} />
            </form>
        </div>
    )
}