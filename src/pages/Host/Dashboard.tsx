import { BsFillStarFill } from "react-icons/bs";
import classes from "../../css-modules/Dashboard.module.css"
import HostVans from "./HostVans";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAverageReviews } from "../../api/review-items";
import { getHostTotal } from "../../api/income.items";
import { USDollarConverter } from "../../api/types";

export default function Dashboard({ hostId }: { hostId: string }) {

  const [reviewScore, setReviewScore] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // TODO: pulling the data and putting it in setIncome and setReviewScore
  useEffect(() => {
    getAverageReviews(hostId).then((data) => {
      if (data) {
        setReviewScore(data)
      }
    });
    getHostTotal(hostId).then(setTotal);
  }, [hostId])

  return (
    <>
      <div className={classes.dashboard}>
        <div className={classes.information}>
          <div className={classes.informationContent}>
            <h1 className={classes.dashboardWelcome}>Welcome!
            </h1>
            <h1>Income</h1>
            <h2 className={classes.income}>
              {USDollarConverter.format(total)}
            </h2>
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
            <strong>{reviewScore.toFixed(1)}</strong>/5.0
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
