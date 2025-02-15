import { useEffect, useState } from "react"
import { ReviewEntry } from "../../api/types"
import classes from "../../css-modules/Reviews.module.css"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import ReviewTempImage from "../../assets/temprating.png"
import { formatDateToDateString } from "../../utils/utils"
import { getAverageReviews, GetHostReviews } from "../../api/items/review-items"
import { useOutletContext } from "react-router-dom"

export default function Reviews() {

  const hostId = useOutletContext<string>();
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [reviewAvg, setReviewAvg] = useState(0);

  useEffect(() => {
    GetHostReviews(hostId).then(setReviews)
    getAverageReviews(hostId).then(data => {
      if (data) {
        setReviewAvg(data);
      } else {
        throw new Error("Average for host not defined");
      }
    })
  }, [hostId]);


  // Should this be its own component...
  const getReviewStars = (rating: number) => {
    if (rating > 5) { rating = 5 };
    const stars: JSX.Element[] = [];
    let keyCount = 0;
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<BsStarFill key={++keyCount} className={classes.stars} color="orange" />)
    }
    if (stars.length < 5) {
      if (rating % Math.floor(rating) !== 0) {
        stars.push(<BsStarHalf key={++keyCount} className={classes.stars} color="orange" />)
      }

      while (stars.length < 5) {
        stars.push(<BsStar key={++keyCount} className={classes.stars} color="orange" />)
      }
    }
    return stars;

  }

  return (
    <main className={classes.reviewContainer}>
      <div className={classes.topbar}>
        <h1>Your reviews</h1>
        <span>last <i>30 days</i></span>
      </div>
      {reviews.length > 0
        ?
        <div className={classes.reviewSummary}>
          <div className={classes.reviewSummaryTitle}>
            <h1>{reviewAvg.toFixed(1)}</h1>
            <BsStarFill className={classes.stars} color="orange" />
            <span>overall rating</span>
          </div>
          <div className={classes.reviewSummaryGraphic}>
            <img className={classes.reviewGraphic} src={ReviewTempImage} />
          </div>
          <h3>{`Reviews (${reviews.length})`}</h3>
          {reviews.map((review) =>
            <section key={review.id} className={classes.reviewContent}>
              <div>
                {getReviewStars(review.rating)}
              </div>
              <div className={classes.reviewTitleBar}>
                <span>{review.name}</span>
                <i>-{formatDateToDateString(review.date.toDate())}</i>
              </div>
              <p className={classes.reviewParagraph}>{review.content}</p>
            </section>)}
        </div>
        : <h2 className={classes.alert}>You have no reviews!</h2>
      }
    </main >
  )
}
