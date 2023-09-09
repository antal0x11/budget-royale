import Head from "next/head";
import TopTitle from "@/lib/TopTitle";
import ExpensesCard from "@/lib/ExpensesCard";
import NewExpense from "@/lib/NewExpense";

import styles from "@/styles/home.module.css";
import MainSubTitle from "@/lib/MainSubTitle";
import Categories from "@/lib/Categories";

import * as React from "react";

export default function Home() {

  const [addExpense,setAddExpense] = React.useState<boolean>(false);

  function handleAddExpense(e: React.MouseEventHandler<SVGSVGElement>) {
    setAddExpense(addExpense ? false : true);
  }

  return (
      <div>
        <Head>
          <title>Expenses Tracker</title>
        </Head>
        <TopTitle />
        <div className={styles.container}>
            <div className={styles.mainContainerItemsLeft}>
              <Categories />
            </div>
            <div className={styles.mainContainerItemsRight}>
                <div className={styles.infoContainer}>
                  <div className={styles.infoContainerItemMain}>
                    <MainSubTitle />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleAddExpense}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                  </div>
                  {addExpense && <div><NewExpense cancel={[addExpense,setAddExpense]}/></div>}
                </div>
                <div className={styles.cardContainer}>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  {/* <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div>
                  <div className={styles.cardContainerItem}><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div> */}
                </div>
            </div>
        </div>
      </div>
    )
}
