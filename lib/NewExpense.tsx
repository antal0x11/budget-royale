import styles from "@/styles/new-expense-form.module.css";
import { NewExpense } from "./ComponentTypes/ExpensesTypes";
import * as React from "react";
import DataContext from "./DataContext";
import CategoryContext from "./CategoryContext";
import UserNotification from "@/lib/UserNotification";
import {
    TextField,
    Stack,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

enum NotificationType {
    info = "notificationType/info",
    error = "notificationType/error",
    none = "notificationType/none",
}

type AddExpenseNotification = {
    msg: string;
    type: NotificationType;
};

interface Props {
    closeNewExpenseForm: () => void;
}

export default function NewExpense(props: Props) {
    // const { updateAddExpense } = props.value;
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(
        dayjs(new Date().toJSON().slice(0, 10)),
    );
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

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCost(e.target.value);
    };

    function handleSubmit() {
        if (categoryInfo === "Select Category") {
            setNotification({
                msg: "You have to select a Category.",
                type: NotificationType.info,
            });
            return;
        }

        if (title.length === 0) {
            setNotification({
                msg: "Title field is empty!",
                type: NotificationType.info,
            });
            return;
        }

        if (cost.length === 0) {
            setNotification({
                msg: "Cost field is empty.",
                type: NotificationType.info,
            });
            return;
        }

        if (isNaN(Number(cost))) {
            setNotification({
                msg: "Cost value is not a valid format.",
                type: NotificationType.info,
            });
            return;
        }

        updateData({ type: "updateData/addExpense" }, null, {
            title: title,
            date: date!.format("DD/MM/YYYY"),
            cost: parseFloat(parseFloat(cost).toFixed(2)),
        });
    }

    function handleCloseNotification(obj: AddExpenseNotification) {
        setNotification(obj);
    }

    return (
        <>
            <div className={styles.addItem}>
                <Stack direction={"column"} mt={2} spacing={2}>
                    <TextField
                        label={"Expense Title"}
                        variant={"outlined"}
                        onChange={handleTitleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={dayjs(date)}
                            onChange={(newDate) => setDate(newDate)}
                        />
                    </LocalizationProvider>
                    <TextField label={"Cost"} variant={"outlined"} onChange={handleCostChange}/>

                    <Stack
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <FormControlLabel
                            label={"Add Multiple Expenses"}
                            control={<Switch color={"primary"} />}
                            labelPlacement={"start"}
                        />
                    </Stack>

                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
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
                            onClick={handleSubmit}
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
                            onClick={() => props.closeNewExpenseForm()}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>

                {/* <label htmlFor={"title"}>Title: </label>
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
                    className={styles.dateBox}
                    id={"date"}
                    type={"date"}
                    name={"selected-date"}
                    value={date}
                    // placeholder={"Select day"}
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
                    <button
                        className={styles.addExpenseBtn}
                        onClick={handleSubmit}
                    >
                        Add Expense
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={() => props.closeNewExpenseForm()}
                    >
                        Cancel
                    </button>
                </div>*/}
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
