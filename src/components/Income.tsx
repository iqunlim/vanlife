import { useEffect, useState } from "react";
import classes from "../css-modules/Dashboard.module.css"
import { USDollarConverter } from "../api/types";

/**
 * Component for displaying the hosts income in a reusable way
 * @param hostId: Current host Id number
 */
export default function IncomeDisplay({ hostId }: { hostId: string }) {


    const [income, setIncome] = useState<number>(0);


    useEffect(() => {
        setIncome(0)
    }, [hostId])

    return <>
        <span>Income last <i>30 days</i></span>
        <h1 className={classes.income}>
            {USDollarConverter.format(income)}
        </h1>
    </>
}