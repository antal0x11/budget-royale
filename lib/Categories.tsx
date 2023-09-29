import styles from "@/styles/categories.module.css";
import {
    Notification,
    ActionOptions
} from "./ComponentTypes/ExpensesTypes";
import * as React from "react";
import DataContext from "./DataContext";
import CategoryContext from "./CategoryContext";
import {
    Button,
    TextField,
    Alert,
    Stack,
    Switch,
    FormControlLabel,
} from "@mui/material";

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
            </div>
        </div>
    );
}