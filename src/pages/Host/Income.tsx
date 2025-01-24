import { useState } from "react";
import IncomeDisplay from "../../components/Income";
import classes from "../../css-modules/Dashboard.module.css"
import { IncomeEntry, USDollarConverter } from "../../api/types";
export default function Income({ hostId }: { hostId: string }) {

  const [transactions, setTransactions] = useState<IncomeEntry[]>([{ value: 720, date: new Date }])

  function formatDateToDateString(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);

    return `${month}/${day}/${year}`;
  }

  return (
    <div className={classes.incomeContainer}>
      <div className={classes.informationContent}>
        <h1>Income</h1>
        <IncomeDisplay hostId={hostId} />
        <h1>Dashboard goes here</h1>
      </div>
      <div className={classes.incomeTransactions}>
        <div className={classes.incomeTransactionsHeader}>
          <h2>Your transactions ({transactions.length})</h2>
          <span>Last <i>30 days</i></span>
        </div>
        <div>
          {transactions ? transactions.map((item) => {
            return <div className={classes.transaction}><strong>{USDollarConverter.format(item.value)}</strong><p>{formatDateToDateString(item.date)}</p></div>
          }) : null}
        </div>
      </div>
    </div>
  )
}
