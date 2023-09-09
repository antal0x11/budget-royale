import styles from "@/styles/categories.module.css";
import { CategoryItem } from "./ComponentTypes/ExpensesTypes";
import * as React from "react";


function CategoryItem(props : CategoryItem) {

    const titleBlock = React.useRef(null);

    const colors = {
        paleBlue : "#97BBE5",
        paleYellow: "#E5D497",
        paleRed: "#E59797",
        paleGreen: "#C3E597",
        palePink: "#E597C6",
        cyan: "#B2E4E1"
    };

    return (
        <li className={styles.categoryItemBlock}>
            <div className={styles.miniContainer}>
                <div ref={titleBlock} className={styles.miniContainerExpenseCategorie} style={{backgroundColor: `${props.color}`}}>{props.title}</div>
                <div className={styles.miniContainerColorPallete}>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.paleBlue}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.paleBlue;}}></button>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.paleYellow}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.paleYellow;}}></button>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.paleRed}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.paleRed;}}></button>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.paleGreen}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.paleGreen;}}></button>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.palePink}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.palePink;}}></button>
                    <button className={styles.colorBtn} style={{backgroundColor: `${colors.cyan}`}} 
                        onClick={() => {titleBlock.current.style.backgroundColor = colors.cyan;}}></button>
                </div>
            </div>
        </li>
    )
}

export default function Categories() {

    const [categoryList, setCategoryList] = React.useState<CategoryItem []>([]);
    const defaultColor : string = "#97BBE5";
    const [currentInput, setCurrentInput] = React.useState<string>("");
    const inputElement = React.useRef(null);

    function handleAddCategoryItem () {

        /*  
            TODO:   - add notification for when an item already exists
                    - add notification for when input box is empty
        */

        const tmp : CategoryItem = {
            title : currentInput,
            color: defaultColor
        };

        setCategoryList(prev => [...prev,tmp]);
        inputElement.current.value = "";
    }
    
    function handleInput(e : React.ChangeEvent<HTMLInputElement>) {
        setCurrentInput(e.target.value);
    }

    return (
        <div className={styles.container}>
            <h2>Categories</h2>
            <div className={styles.subContainer}>
                <input ref={inputElement} type={"text"} placeholder={"Add New Category"} onInput={handleInput}/>
                <button className={styles.addCategory} onClick={handleAddCategoryItem}>Add Category</button>
                {categoryList.length !== 0 && 
                    <ul className={styles.categoriesMenu}>
                        {
                            categoryList.map( (item : CategoryItem, index : number) => {
                                return <CategoryItem key={index} title={item.title} color={item.color}/>
                            }) 
                        }
                    </ul>
                }
            </div>
            <div></div>
        </div>
    )
}