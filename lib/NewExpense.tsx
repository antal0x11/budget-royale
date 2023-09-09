import styles from "@/styles/new-expense-form.module.css";
import { NewExpense } from "./ComponentTypes/ExpensesTypes";
import * as React from "react";

export default function NewExpense(props : NewExpense) {

    const [add, setAdd] = props.cancel;
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [comments, setComments] = React.useState("");

    const titleRef = React.useRef(null);
    const dateRef = React.useRef(null);
    const costRef = React.useRef(null);
    const commentsRef = React.useRef(null);

    /*
        TODO: 
            - validate input
            - add error messages
            - add colors to DOM when fields have errors

    */

    const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleDateChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const handleCostChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCost(e.target.value);
    }

    const handleCommentsChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setComments(e.target.value);
    }


    function handleSubmit(e : React.FormEvent) {
        e.preventDefault();

        console.log(title + " " + date + " " + cost + " " + comments); 
        titleRef.current.value = "";
        dateRef.current.value = "";
        costRef.current.value = "";
        commentsRef.current.value = "";
    }

    return (
            <form className={styles.addItem} action={"#"} method={"POST"} onSubmit={handleSubmit} >
                <label htmlFor={"title"}>Title: </label>
                <input ref={titleRef} className={styles.inputBoxN} id={"title"} type={"text"} name={"title"} placeholder={"Name your expense"} required={true} 
                    onChange={handleTitleChange}/>
                
                <label htmlFor={"date"}>Date: </label>
                <input ref={dateRef} className={styles.inputBoxN} id={"date"} type={"date"} name={"selected-date"} placeholder={"Select day"} required={true} 
                    onChange={handleDateChange}/>
                
                <label htmlFor={"cost"}>Cost: </label>
                <input ref={costRef} className={styles.inputBoxN} id={"cost"} type={"cost"} name={"cost"} placeholder={"Price Tag"} required={true} 
                    onChange={handleCostChange}/>
                
                <label htmlFor={"comments"}>Comments: </label>
                <textarea ref={commentsRef} className={styles.inputBoxN} id={"comments"} name={"comments"} rows={4} cols={40} placeholder={"Write a comment relative to your expense"} autoComplete={"off"} 
                        onChange={handleCommentsChange}/>
                
                <div className={styles.btn}>
                    <input className={styles.inputSubmit} type={"submit"} value={"Add Expense"} />
                    <button className={styles.cancelBtn} onClick={() => setAdd(false)}>Cancel</button>
                </div>
            </form>
        )
    }