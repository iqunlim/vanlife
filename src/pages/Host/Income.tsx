import { useEffect, useState } from "react";
import classes from "../../css-modules/Dashboard.module.css"
import { IncomeEntry, USDollarConverter } from "../../api/types";
import GraphImgTemp from "../../assets/tempgraph.png";
import { formatDateToDateString } from "../../utils/utils";
import { getHostIncome, getHostTotal } from "../../api/items/income.items";
import { useOutletContext } from "react-router-dom";

export default function Income() {

  const hostId = useOutletContext<string>();
  const [transactions, setTransactions] = useState<IncomeEntry[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Transactions fetch
  useEffect(() => {
    getHostIncome(hostId).then(setTransactions);
    getHostTotal(hostId).then(setTotal);
  }, [hostId]);


  return (
    <main className={classes.incomeContainer}>
      <div className={classes.informationContent}>
        <h1>Income</h1>
        <h1 className={classes.income}>
          {USDollarConverter.format(total)}
        </h1>
      </div>
      <div>
        <div className={classes.incomeTransactionsHeader}>
          <h2>Your transactions ({transactions.length})</h2>
          <span>Last <i>30 days</i></span>
        </div>
        <div className={classes.transactionContainer}>
          {transactions.length > 0
            ? <section>
              <div className={classes.incomeTempImg}>
                <img src={GraphImgTemp} />
              </div>
              {transactions.map((item) => {
                return <div key={item.id} className={classes.transaction}>
                  <strong>{USDollarConverter.format(item.amount)}</strong>
                  <p>{formatDateToDateString(item.date.toDate())}</p>
                </div>
              })}
            </section>
            : <h1 className={classes.alert}>You have no transactions yet!</h1>}
        </div>
      </div>
    </main>
  )
}
