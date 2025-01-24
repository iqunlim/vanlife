import { BsFillStarFill } from "react-icons/bs";
import classes from "../../css-modules/Dashboard.module.css"
import HostVans from "./HostVans";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard({ hostId }: { hostId: string }) {

  const [income, setIncome] = useState<number>(0);
  const [reviewScore, setReviewScore] = useState<number>(0);

  // TODO: pulling the data and putting it in setIncome and setReviewScore
  useEffect(() => {
    setIncome(0)
    setReviewScore(0)
  }, [hostId])

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      <div className={classes.dashboard}>
        <div className={classes.information}>
          <div className={classes.informationContent}>
            <h1 className={classes.dashboardWelcome}>Welcome!
            </h1>
            <span>Income last <i>30 days</i></span>
            <h1 className={classes.income}>
              {USDollar.format(income)}
            </h1>
          </div>
          <div className={classes.detailsContainer}>
            <NavLink className={classes.details} to="income">Details</NavLink>
          </div>
        </div>
        <div className={classes.reviews}>
          <p>
            Review Score
          </p>
          <p>
            <BsFillStarFill color="orange" />
            {reviewScore.toFixed(1)}/5.0
          </p>
          <NavLink className={classes.details} to="reviews">Details</NavLink>
        </div>
      </div >
      <div className={classes.vansListHeader}>
        <h2>Your listed vans</h2>
        <NavLink className={classes.details} to="vans">View All</NavLink>
      </div>

      <HostVans hostId={hostId} count={3} showedit />
    </>
  );
}
