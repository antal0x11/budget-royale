import styles from "@/styles/categories.module.css";
import { CategoryItem } from "./ComponentTypes/ExpensesTypes";
import {
    Notification,
    ActionOptions,
    ExpensesObject,
} from "./ComponentTypes/ExpensesTypes";
import * as React from "react";
import DataContext from "./DataContext";
import CategoryContext from "./CategoryContext";
import Link from "next/link";
import {
    Button,
    TextField,
    Alert,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton,
    Stack,
    Switch,
    FormControlLabel,
} from "@mui/material";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

function notificationReducer(
    state: Notification,
    action: ActionOptions,
): Notification {
    switch (action.type) {
        case "notification/empty":
            return {
                msg: "Category Input field is empty!",
                display: true,
                severity: "error",
            };
        case "notification/duplicate":
            return {
                msg: "A record with the same category already exists.",
                display: true,
                severity: "error",
            };

        case "notification/success":
            return {
                msg: "New Category Added successfully.",
                display: true,
                severity: "success",
            };
        default:
            return { ...state, display: false };
    }
}

interface Props {
    closeCategoryComponent: () => void;
}

export default function Categories(props: Props) {
    const defaultColor: string = "#97BBE5";
    const [currentInput, setCurrentInput] = React.useState<string>("");
    const [notificationState, dispatchNotification] = React.useReducer(
        notificationReducer,
        { msg: "none", display: false, severity: "success" },
    );
    const { data, updateData } = React.useContext(DataContext)!;
    const { categoryInfo, updateCategoryInfo } =
        React.useContext(CategoryContext)!;
    const [addMultipleCategorySwitch, setAddMultipleCategorySwitch] =
        React.useState<boolean>(false);

    function handleSelectedBlock(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        key: number,
        category: string,
    ): void {
        updateCategoryInfo(category);
    }

    function handleAddCategoryItem() {
        if (currentInput.length === 0 || currentInput === " ") {
            dispatchNotification({ type: "notification/empty" });
            setCurrentInput("");
            return;
        }

        const tmpInputFirstLetterCapital: string =
            currentInput.charAt(0).toUpperCase() + currentInput.slice(1);

        /**
         * duplicate check is not case sensitive
         */
        if (
            data.find(
                (element) =>
                    element.category.title === tmpInputFirstLetterCapital,
            ) !== undefined
        ) {
            dispatchNotification({ type: "notification/duplicate" });
            setCurrentInput("");
            return;
        }

        /**
         * ADD Category central
         */
        updateData(
            { type: "updateData/addNewCategory" },
            {
                title: tmpInputFirstLetterCapital,
                color: defaultColor,
                active: false,
            },
            null,
        );

        if (addMultipleCategorySwitch) {
            dispatchNotification({ type: "notification/success" });
            setCurrentInput("");
        } else {
            setCurrentInput("");
            props.closeCategoryComponent();
        }
        
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (notificationState.display) {
            dispatchNotification({ type: "off" });
        }

        setCurrentInput(e.target.value);
    }

    //TODO handle delete Category

    // function handleDeleteItem(
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     itemToDelete: CategoryItem,
    // ): void {
    //     updateData(
    //         { type: "updateData/deleteCategory" },
    //         itemToDelete.category,
    //     );
    // }

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                {notificationState.display && (
                    <Alert
                        variant={"outlined"}
                        severity={notificationState.severity === "success" ? "success" : "error"}
                        onClose={() => dispatchNotification({ type: "off" })}
                    >
                        {notificationState.msg}
                    </Alert>
                )}
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                >
                    <TextField
                        label={"Category"}
                        variant={"standard"}
                        helperText={"Create a new Category"}
                        value={currentInput}
                        onInput={handleInput}
                        className={styles.textField}
                    />

                    <FormControlLabel
                        label={"Add Multiple Categories"}
                        control={
                            <Switch
                                color={"primary"}
                                onChange={() =>
                                    setAddMultipleCategorySwitch(
                                        (prev : boolean) => !prev
                                    )
                                }
                            />
                        }
                        labelPlacement={"start"}
                    />
                </Stack>
                <Stack direction={"row"}>
                    <Button
                        variant="outlined"
                        onClick={handleAddCategoryItem}
                        style={{
                            marginTop: "12px",
                            marginLeft: "10px",
                            width: "120px",
                            height: "fit-content",
                            color: "black",
                            borderColor: "black",
                            textTransform: "inherit",
                        }}
                    >
                        Add
                    </Button>

                    <Button
                        variant="outlined"
                        style={{
                            marginTop: "12px",
                            marginLeft: "10px",
                            width: "120px",
                            height: "fit-content",
                            color: "black",
                            borderColor: "black",
                            textTransform: "inherit",
                        }}
                        onClick={() => props.closeCategoryComponent()}
                    >
                        Cancel
                    </Button>
                </Stack>
                {/*{data.length !== 0 && (
                    <List component={"nav"}>
                        {data!.map((item: ExpensesObject, index: number) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemButton
                                        key={index}
                                        selected={item.category.title === categoryInfo}
                                        onClick={(event, key, category) =>
                                            handleSelectedBlock(
                                                event,
                                                index,
                                                item.category.title,
                                            )
                                        }
                                    >
                                        <ListItemIcon>
                                            {item.category.title === categoryInfo && (
                                                <LabelImportantOutlinedIcon
                                                    color={"info"}
                                                />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.category.title}
                                        />
                                    </ListItemButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(event, itemToDelete) =>
                                            handleDeleteItem(event, item)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    // <ul className={styles.categoriesMenu}>
                    //     {data!.map((item: ExpensesObject, index: number) => {
                    //         return (
                    //             <CategoryItem
                    //                 key={index}
                    //                 title={item.category.title}
                    //                 color={item.category.color}
                    //                 active={item.category.active}
                    //             />
                    //         );
                    //     })}
                    // </ul>
                )}*/}
            </div>
        </div>
    );
}

// function CategoryItem(props: CategoryItem) {
//     const titleBlock = React.useRef<HTMLDivElement>(null);
//     const { data, updateData } = React.useContext(DataContext)!;
//     const { categoryInfo, updateCategoryInfo } =
//         React.useContext(CategoryContext)!;

//     const colors = {
//         paleBlue: "#97BBE5",
//         paleYellow: "#E5D497",
//         paleRed: "#E59797",
//         paleGreen: "#C3E597",
//         palePink: "#E597C6",
//         cyan: "#B2E4E1",
//     };

//     function handleDeleteItem() {
//         updateData({ type: "updateData/deleteCategory" }, props);
//     }

//     function selectCategoryBlock() {
//         updateCategoryInfo(props.title);
//         updateData({ type: "updateData/updateActiveCategory" }, props, null);
//     }

//     return (
//         <li className={styles.categoryItemBlock}>
//             <div className={styles.miniContainer}>
//                 <div
//                     ref={titleBlock}
//                     className={styles.miniContainerExpenseCategorie}
//                     style={{ backgroundColor: `${props.color}` }}
//                     onClick={selectCategoryBlock}
//                 >
//                     {props.title}
//                 </div>
//                 <div className={styles.miniContainerColorPallete}>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.paleBlue}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.paleBlue;
//                         }}
//                     ></button>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.paleYellow}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.paleYellow;
//                         }}
//                     ></button>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.paleRed}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.paleRed;
//                         }}
//                     ></button>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.paleGreen}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.paleGreen;
//                         }}
//                     ></button>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.palePink}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.palePink;
//                         }}
//                     ></button>
//                     <button
//                         className={styles.colorBtn}
//                         style={{ backgroundColor: `${colors.cyan}` }}
//                         onClick={() => {
//                             titleBlock.current!.style.backgroundColor =
//                                 colors.cyan;
//                         }}
//                     ></button>
//                     <div
//                         className={styles.deleteCategoryItem}
//                         onClick={handleDeleteItem}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                             />
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         </li>
//     );
// }
