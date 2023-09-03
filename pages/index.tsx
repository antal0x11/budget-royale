import TopTitle from "@/lib/TopTitle";
import ExpensesCard from "@/lib/ExpensesCard";
import NewExpense from "@/lib/NewExpense";

import styles from "@/styles/home.module.css";
import MainSubTitle from "@/lib/MainSubTitle";
import Categories from "@/lib/Categories";

export default function Home() {
  return (
      <div>
        <TopTitle />
        <div className={styles.container}>
            <div>
              <MainSubTitle />
              <Categories />
            </div>
            <div><NewExpense /></div>
            {/* <div><ExpensesCard title={"Harry Potter"} cost={12} date={"01/02/2022"} comments={"Have to buy this book for a gift."}/></div> */}
        </div>
      </div>
    )
}
