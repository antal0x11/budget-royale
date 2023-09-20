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

export default function Expenses() {
  const [addExpense, setAddExpense] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ExpensesObject[]>([]);
  const [displayData, setDisplayData] = React.useState<ExpensesCardProps[]>([]);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [categoryInfo, setCategoryInfo] = React.useState<string>("");

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
        /**
         * TODO:
         *  if the category that we want to delete is the
         *  same as the selected category set to []
         *
         */

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
      <TopTitle />
      <CategoryContext.Provider value={{ categoryInfo, updateCategoryInfo }}>
        <DataContext.Provider value={{ data, updateData }}>
          <div className={styles.container}>
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
                          comments={element.comments}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </DataContext.Provider>
      </CategoryContext.Provider>
    </>
  );
}
