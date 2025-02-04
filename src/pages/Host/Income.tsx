import { useEffect, useState } from "react";
import IncomeDisplay from "../../components/Income";
import classes from "../../css-modules/Dashboard.module.css"
import { IncomeEntry, USDollarConverter } from "../../api/types";
import GraphImgTemp from "../../assets/tempgraph.png";
import { formatDateToDateString } from "../../utils/utils";

export default function Income({ hostId }: { hostId: string }) {

  const [transactions, setTransactions] = useState<IncomeEntry[]>([{ value: 720, date: new Date }])

  // Transactions fetch
  useEffect(() => { }, [hostId])


  return (
    <div className={classes.incomeContainer}>
      <div className={classes.informationContent}>
        <h1>Income</h1>
        <IncomeDisplay hostId={hostId} />
      </div>
      <div className={classes.incomeTempImg}>
        <img src={GraphImgTemp} />
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
