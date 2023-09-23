import styles from "@/styles/new-expense-form.module.css";
import { NewExpense } from "./ComponentTypes/ExpensesTypes";
import * as React from "react";
import DataContext from "./DataContext";
import CategoryContext from "./CategoryContext";
import UserNotification from "@/lib/UserNotification";

enum NotificationType {
    info = "notificationType/info",
    error = "notificationType/error",
    none = "notificationType/none",
}

type AddExpenseNotification = {
    msg: string;
    type: NotificationType;
};

export default function NewExpense(props: NewExpense) {
    const { updateAddExpense } = props.value;
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [notification, setNotification] =
        React.useState<AddExpenseNotification>({
            msg: "",
            type: NotificationType.none,
        });

    const titleRef = React.useRef<HTMLInputElement>(null);
    const dateRef = React.useRef<HTMLInputElement>(null);
    const costRef = React.useRef<HTMLInputElement>(null);

    const { updateData } = React.useContext(DataContext)!;
    const { categoryInfo } = React.useContext(CategoryContext)!;

    /*
        TODO: 
            - add colors to DOM when fields have errors
    */

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCost(e.target.value);
    };

    function handleSubmit() {

        if (categoryInfo.length === 0) {
            setNotification({
                msg: "You have to select a Category.",
                type: NotificationType.info
            })
            return;
        }

        if (title.length === 0) {
            setNotification({
                msg: "Title field is empty!",
                type: NotificationType.info
            });
            titleRef.current!.value = "";
            return;
        }

        if (date.length === 0) {
            setNotification({
                msg: "Date field is not selected!",
                type: NotificationType.info
            });
            dateRef.current!.value = "";
            return;
        }

        if (cost.length === 0) {
            setNotification({
                msg: "Cost field is empty.",
                type: NotificationType.info
            });
            costRef.current!.value = "";
            return;
        }

        if (isNaN(Number(cost))) {
            setNotification({
                msg: "Cost value is not a valid format.",
                type: NotificationType.info
            });
            costRef.current!.value = "";
            return;
        }
        
        updateData({ type: "updateData/addExpense" }, null, {
            title: title,
            date: date,
            cost: parseFloat(parseFloat(cost).toFixed(2)),
        });
        

        titleRef.current!.value = "";
        dateRef.current!.value = "";
        costRef.current!.value = "";
    }

    function handleCloseNotification(obj : AddExpenseNotification) {
        setNotification(obj);
    }

    return (
        <>
            <div className={styles.addItem}>
                <label htmlFor={"title"}>Title: </label>
                <input
                    ref={titleRef}
                    className={styles.inputBoxN}
                    id={"title"}
                    type={"text"}
                    name={"title"}
                    placeholder={"Name your expense"}
                    onChange={handleTitleChange}
                />

                <label htmlFor={"date"}>Date: </label>
                <input
                    ref={dateRef}
                    className={styles.inputBoxN}
                    id={"date"}
                    type={"date"}
                    name={"selected-date"}
                    placeholder={"Select day"}
                    onChange={handleDateChange}
                />

                <label htmlFor={"cost"}>Cost: </label>
                <input
                    ref={costRef}
                    className={styles.inputBoxN}
                    id={"cost"}
                    type={"cost"}
                    name={"cost"}
                    placeholder={"Price $"}
                    onChange={handleCostChange}
                />

                <div className={styles.btn}>
                    <input
                        className={styles.inputSubmit}
                        type={"submit"}
                        value={"Add Expense"}
                        onClick={handleSubmit}
                    />
                    <button
                        className={styles.cancelBtn}
                        onClick={() => updateAddExpense()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            {notification.type !== NotificationType.none && (
                <UserNotification
                    msg={notification.msg}
                    notificationType={notification.type}
                    closeNotification={handleCloseNotification}
                />
            )}
        </>
    );
}
