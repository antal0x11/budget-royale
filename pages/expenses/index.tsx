import Head from "next/head";
import Link from "next/link";
import TopTitle from "@/lib/TopTitle";
import ExpensesCard from "@/lib/ExpensesCard";
import NewExpense from "@/lib/NewExpense";

import styles from "@/styles/home.module.css";
import MainSubTitle from "@/lib/MainSubTitle";
import Categories from "@/lib/Categories";

import * as React from "react";
import DataContext from "@/lib/DataContext";
import CategoryContext from "@/lib/CategoryContext";
import {
  CategoryItem,
  ExpensesObject,
  ExpensesCardProps,
  ActionOptions,
} from "@/lib/ComponentTypes/ExpensesTypes";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function Expenses() {
  const [addExpense, setAddExpense] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ExpensesObject[]>([]);
  const [displayData, setDisplayData] = React.useState<ExpensesCardProps[]>([]);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [categoryInfo, setCategoryInfo] =
    React.useState<string>("Select Category");
  const [displayCategoriesBox, setDisplayCategoriesBox] = React.useState(false);
  const [displayNewExpenseForm,setDisplayNewExpenseForm] = React.useState(false);

  function closeCategoryComponent() {
    setDisplayCategoriesBox((prev : boolean) => !prev);
  }

  function closeNewExpenseForm() {
    setDisplayNewExpenseForm((prev : boolean) => !prev);
  }

  function updateData(
    action: ActionOptions,
    newCat?: CategoryItem | null,
    newCard?: ExpensesCardProps | null,
  ): void {
    switch (action.type) {
      case "updateData/addNewCategory":
        const tmp: ExpensesObject = {
          category: newCat!,
          items: [],
        };
        setData((prev) => [...prev, tmp]);
        break;

      case "updateData/deleteCategory":
        let categorySum = 0;
        data.forEach((item) => {
          if (item.category.title === newCat!.title) {
            item.items.forEach((element) => (categorySum += element.cost));
          }
        });

        setTotalCost(totalCost - categorySum);
        setData(
          data.filter((element) => element.category.title !== newCat!.title),
        );
        setCategoryInfo(categoryInfo === newCat!.title ? "" : categoryInfo);
        setDisplayData([]);
        break;

      case "updateData/updateActiveCategory":
        setData(
          data.map((element) => {
            if (element.category.title === newCat?.title) {
              setDisplayData(element.items);
              setCategoryInfo(newCat?.title);
              return {
                ...element,
                category: { ...element.category, active: true },
              };
            } else {
              return {
                ...element,
                category: { ...element.category, active: false },
              };
            }
          }),
        );
        break;

      case "updateData/addExpense":
        setData(
          data.map((element) => {
            if (element.category.active === true) {
              /**
               * Increase total cost when adding an item.
               */
              setDisplayData([...element.items, newCard!]);
              setTotalCost(totalCost + newCard!.cost);

              return { ...element, items: [...element.items, newCard!] };
            } else {
              return element;
            }
          }),
        );
        break;

      case "updateData/deleteExpense":
        setData(
          data.map((element) => {
            if (element.category.active === true) {
              setDisplayData(
                element.items.filter((it) => it.title !== newCard!.title),
              );

              /**
               * Reduce total cost when deleting an item.
               */
              setTotalCost(totalCost - newCard!.cost);

              return {
                ...element,
                items: element.items.filter(
                  (it) => it.title !== newCard!.title,
                ),
              };
            } else {
              return element;
            }
          }),
        );
        break;
    }
  }

  function updateAddExpense(): void {
    setAddExpense(addExpense ? false : true);
  }

  function updateCategoryInfo(selectedCategory: string): void {
    setCategoryInfo(selectedCategory);
  }

  return (
    <>
      <Head>
        <title>Budget Royale</title>
      </Head>
      <TopTitle />
      <CategoryContext.Provider value={{ categoryInfo, updateCategoryInfo }}>
        <DataContext.Provider value={{ data, updateData }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar component={"nav"} position={"static"}>
              <Toolbar style={{ backgroundColor: "white" }}>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography
                    variant={"h6"}
                    component={"div"}
                    sx={{ flexGrow: 1 }}
                  >
                    Home
                  </Typography>
                </Link>

                <Button
                  variant="outlined"
                  onClick={() => {
                    setDisplayCategoriesBox((prev : boolean) => !prev);
                  }}
                  style={{
                    marginTop: "12px",
                    marginLeft: "10px",
                    width: "120px",
                    height: "fit-content",
                    color: "black",
                    borderColor: "black",
                    border: "0px solid black",
                    textTransform: "inherit",
                    fontSize: "18px",
                    marginBottom: "12px",
                  }}
                >
                  Category
                </Button>

                <Button
                  style={{
                    marginTop: "12px",
                    marginLeft: "10px",
                    width: "120px",
                    height: "fit-content",
                    color: "black",
                    borderColor: "black",
                    border: "0px solid black",
                    textTransform: "inherit",
                    fontSize: "18px",
                    marginBottom: "12px",
                  }}
                  onClick={ () => setDisplayNewExpenseForm((prev : boolean) => !prev)}
                >
                  Expense
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Total Cost : 0 $
            </Typography>
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Category Cost : 0 $
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: "20px"}}
            >
              {categoryInfo !== "Select Category" ? categoryInfo : ""}
            </Typography>

            <Select
              variant={"filled"}
              label={"Select Category"}
              style={{
                width: "200px",
                backgroundColor: "white",
                marginBottom: "10px",
                marginRight: "20px",
              }}
              value={categoryInfo}
              onChange={(event: SelectChangeEvent<string>) => setCategoryInfo(event.target.value)}
            >
              <MenuItem value={"Select Category"}>Select Category</MenuItem>
              {data.length !== 0 &&
                data.map((item: ExpensesObject, index: number) => {
                  return (
                    <MenuItem key={index} value={item.category.title}>
                      {item.category.title}
                    </MenuItem>
                  );
                })}
            </Select>
          </Stack>

          {displayCategoriesBox && (
            <Box style={{ width: "fit-content", height: "fit-content" }}>
              <Categories closeCategoryComponent={closeCategoryComponent}/>
            </Box>
          )}
          {displayNewExpenseForm && (
            <Box style={{ width: "fit-content", height: "fit-content" }}>
              <NewExpense closeNewExpenseForm={closeNewExpenseForm}/>
            </Box>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <T />
              <T />
              <T />
            </Box>
          </Stack>

          {/*<div className={styles.container}>
            <div className={styles.mainContainerItemsLeft}>
              <Categories />
            </div>
            <div className={styles.mainContainerItemsRight}>
              <div className={styles.infoContainer}>
                <div className={styles.infoContainerItemMain}>
                  <MainSubTitle
                    totalCost={totalCost}
                    updateAddExpense={updateAddExpense}
                  />
                </div>
                {addExpense && (
                  <div>
                    <NewExpense value={{ addExpense, updateAddExpense }} />
                  </div>
                )}
              </div>
              <div className={styles.cardContainer}>
                {displayData.length !== 0 &&
                  displayData.map((element, index) => {
                    return (
                      <div key={index} className={styles.cardContainerItem}>
                        <ExpensesCard
                          title={element.title}
                          cost={element.cost}
                          date={element.date}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>*/}
        </DataContext.Provider>
      </CategoryContext.Provider>
    </>
  );
}

function T() {
  return (
    <Box style={{ width: "fit-content", marginLeft: "10px" }}>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt={2}
        >
          <Card
            style={{
              border: "2px solid black",
              width: "350px",
              backgroundColor: "pink",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom={true}
                variant={"h6"}
                component={"div"}
              >
                Harry Potter and the philosopher stone
              </Typography>
              <Typography variant={"h5"} component={"div"}>
                18 $
              </Typography>
              <Stack direction={"row"}>
                <Typography
                  variant={"body2"}
                  color={"text.secondary"}
                  style={{ marginTop: "12px" }}
                >
                  23/09/2023
                </Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>

          <Card style={{ border: "2px solid black", width: "350px" }}>
            <CardContent>
              <Typography
                gutterBottom={true}
                variant={"h6"}
                component={"div"}
              >
                Harry Potter and the philosopher stone
              </Typography>
              <Typography variant={"h5"} component={"div"}>
                18 $
              </Typography>
              <Stack direction={"row"}>
                <Typography
                  variant={"body2"}
                  color={"text.secondary"}
                  style={{ marginTop: "12px" }}
                >
                  23/09/2023
                </Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>

          <Card style={{ border: "2px solid black", width: "350px" }}>
            <CardContent>
              <Typography
                gutterBottom={true}
                variant={"h6"}
                component={"div"}
              >
                Harry Potter and the philosopher stone
              </Typography>
              <Typography variant={"h5"} component={"div"}>
                18 $
              </Typography>
              <Stack direction={"row"}>
                <Typography
                  variant={"body2"}
                  color={"text.secondary"}
                  style={{ marginTop: "12px" }}
                >
                  23/09/2023
                </Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
}
