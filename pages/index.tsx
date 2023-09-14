import Head from "next/head";
import TopTitle from "@/lib/TopTitle";
import ExpensesCard from "@/lib/ExpensesCard";
import NewExpense from "@/lib/NewExpense";

import styles from "@/styles/home.module.css";
import MainSubTitle from "@/lib/MainSubTitle";
import Categories from "@/lib/Categories";

import * as React from "react";
import DataContext from "@/lib/DataContext";
import { CategoryItem, ExpensesObject, ExpensesCardProps, ActionOptions } from "@/lib/ComponentTypes/ExpensesTypes";

export default function Home() {

  const [ addExpense,setAddExpense ] = React.useState<boolean>(false);
  const [ data,setData ] = React.useState<ExpensesObject []>([]);
  const [ displayData,setDisplayData ] = React.useState<ExpensesCardProps []>([]);
  const [ totalCost,setTotalCost ] = React.useState<number>(0);
  const [ selectedCategory,setSelectedCategory ] = React.useState<string>(" - ");

  function updateData(action : ActionOptions, newCat?: CategoryItem | null, newCard? : ExpensesCardProps | null) : void {
    switch(action.type) {
      case "updateData/addNewCategory":

        const tmp : ExpensesObject = {
          category : newCat!,
          items: []
        }
        setData( prev => [...prev, tmp]);
      break;

      case "updateData/deleteCategory":

        /**
         * TODO: 
         *  if the category that we want to delete is the 
         *  same as the selected category set to []
         *  
         */

        setData(data.filter(element => element.category.title !== newCat!.title));  
        setDisplayData([]);
        setSelectedCategory(" - ")
      break;

      case "updateData/updateActiveCategory":
        setData(data.map(element => {
          
            /**
             * A unique identifier is not used at the moment
             * so title will be used
             * TODO: 
             *    - add unique identifier
             */
            if (element.category.title === newCat?.title) {
                if (newCat?.active === false) {
                  setDisplayData(element.items);
                  setSelectedCategory(newCat.title);
                  return {...element, category : { active: true, color : newCat!.color, title : newCat!.title}};
                } else {
                  return {...element, category : { active: false, color : newCat!.color, title : newCat!.title}};
                }
            } else {
              return element;
            }
        }));
      break;

      case "updateData/addExpense":
        
        setData(data.map(element => {
          if (element.category.active === true) {

            /**
             * Increase total cost when adding an item.
             */
            setDisplayData([...element.items, newCard!]);

            setTotalCost(totalCost + newCard!.cost);

            return {...element, items : [...element.items, newCard!]};

          } else {
            return element;
          }
        }));
      break;

      case "updateData/deleteExpense":

        setData(data.map(element => {
          if (element.category.active === true) {

            setDisplayData(element.items.filter(it => it.title !== newCard!.title));

            /**
             * Reduce total cost when deleting an item.
             */
            setTotalCost(totalCost - newCard!.cost);

            return {...element, items : element.items.filter(it => it.title !== newCard!.title)};

          } else {
            return element;
          }
        }));
      break;
    }
  }

  function updateAddExpense() : void {
    setAddExpense(addExpense ? false : true);
  }

  return (
      <>
        <Head>
          <title>Expenses Tracker</title>
        </Head>
        <TopTitle />
        <DataContext.Provider value={{ data,updateData }}>
          <div className={styles.container}>
              <div className={styles.mainContainerItemsLeft}>
                <Categories />
              </div>
              <div className={styles.mainContainerItemsRight}>
                  <div className={styles.infoContainer}>
                    <div className={styles.infoContainerItemMain}>
                      <MainSubTitle totalCost={totalCost} selectedCategory={selectedCategory}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={updateAddExpense}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    {addExpense && <div><NewExpense value={{addExpense,updateAddExpense}}/></div>}
                  </div>
                  <div className={styles.cardContainer}>
                    {displayData.length !== 0 && 
                      displayData.map((element, index) => {
                        return <div key={index} className={styles.cardContainerItem}><ExpensesCard title={element.title} cost={element.cost} date={element.date} comments={element.comments}/></div>
                      })
                    }
                  </div>
              </div>
          </div>
        </DataContext.Provider>
      </>
    )
}
