import Head from "next/head";
import Link from "next/link";
import TopTitle from "@/lib/TopTitle";
import NewExpense from "@/lib/NewExpense";
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
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Expenses() {
  const [addExpense, setAddExpense] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ExpensesObject[]>([]);
  const [displayData, setDisplayData] = React.useState<ExpensesCardProps[]>([]);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [categoryInfo, setCategoryInfo] =
    React.useState<string>("Select Category");
  const [displayCategoriesBox, setDisplayCategoriesBox] = React.useState(false);
  const [displayNewExpenseForm, setDisplayNewExpenseForm] =
    React.useState(false);
  const [categoryCost, setCategoryCost] = React.useState<number>(0);

  function closeCategoryComponent() {
    setDisplayCategoriesBox((prev: boolean) => !prev);
  }

  function closeNewExpenseForm() {
    setDisplayNewExpenseForm((prev: boolean) => !prev);
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
        setCategoryInfo(categoryInfo === newCat!.title ? "Select Category" : categoryInfo);
        setCategoryCost(0);
        setDisplayData([]);
        break;

      case "updateData/addExpense":
        setData(
          data.map((element) => {
            if (element.category.title === categoryInfo) {
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
        setCategoryCost(prev => prev + newCard!.cost);
        break;

      case "updateData/deleteExpense":
        setData(
          data.map((element) => {
            if (element.category.title === categoryInfo) {
              setDisplayData(
                element.items.filter((it) => it.title !== newCard!.title),
              );

              /**
               * Reduce total cost when deleting an item.
               */
              setTotalCost(totalCost - newCard!.cost);
              setCategoryCost(prev => prev - newCard!.cost)

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

  function handleChangeSelectedCategory(event: SelectChangeEvent<string>) {
    setCategoryInfo(event.target.value);
    let tmp : ExpensesCardProps [] = [];
    for (let item of data) {
      if (item.category.title === event.target.value) {
        tmp = item.items;
      }
    }
    let sumCategory = 0;
    tmp.forEach((item) => {
      sumCategory += item.cost;
    });
    console.log(sumCategory);
    setCategoryCost(sumCategory);
    setDisplayData(tmp);
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
                    setDisplayCategoriesBox((prev: boolean) => !prev);
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
                  onClick={() =>
                    setDisplayNewExpenseForm((prev: boolean) => !prev)
                  }
                >
                  Expense
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent={"center"}
          >
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Total Cost : {totalCost <= 0 ? 0 : totalCost.toFixed(2)} $
            </Typography>
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ flexGrow: 1 }}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Category Cost : {categoryCost <= 0 ? 0 : categoryCost.toFixed(2)} $
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
              style={{ marginLeft: "20px" }}
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
              onChange={handleChangeSelectedCategory}
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

            {
              categoryInfo !== "Select Category" &&
              <Button
                  style={{
                    marginTop: "12px",
                    marginLeft: "10px",
                    width: "fit-content",
                    height: "fit-content",
                    color: "black",                
                    textTransform: "inherit",
                    fontSize: "18px",
                    marginBottom: "12px",
                    marginRight: "10px",
                    borderColor: "red"
                  }}
                  variant={"outlined"}
                  onClick={() => updateData({type: "updateData/deleteCategory"},{title: categoryInfo}, null)}
                >
                  Clear
                </Button>
            }
          </Stack>

          {displayCategoriesBox && (
            <Box style={{ width: "fit-content", height: "fit-content" }}>
              <Categories closeCategoryComponent={closeCategoryComponent} />
            </Box>
          )}
          {displayNewExpenseForm && (
            <Box style={{ width: "fit-content", height: "fit-content" }}>
              <NewExpense closeNewExpenseForm={closeNewExpenseForm} />
            </Box>
          )}
          <Grid container spacing={1} style={{marginLeft: "15px"}}>
            {displayData.length !== 0 &&
              displayData.map((element: ExpensesCardProps, index: number) => {
                return (
                  <Grid item xs={12} sm={4} key={index}>
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
                          {element.title}
                        </Typography>
                        <Typography variant={"h5"} component={"div"}>
                          {element.cost} $
                        </Typography>
                        <Stack direction={"row"}>
                          <Typography
                            variant={"body2"}
                            color={"text.secondary"}
                            style={{ marginTop: "12px" }}
                          >
                            {element.date}
                          </Typography>
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              updateData(
                                { type: "updateData/deleteExpense" },
                                null,
                                element,
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </DataContext.Provider>
      </CategoryContext.Provider>
    </>
  );
}

