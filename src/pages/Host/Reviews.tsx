import { useEffect, useState } from "react"
import { ReviewEntry } from "../../api/types"
import classes from "../../css-modules/Reviews.module.css"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import ReviewTempImage from "../../assets/temprating.png"
import { formatDateToDateString } from "../../utils/utils"

export default function Reviews({ hostId }: { hostId: string }) {

  const [reviews, setReviews] = useState<ReviewEntry[]>([{
    host: "5mU9N7P3DcVmNJpAhWtc6iZV4752",
    rating: 5,
    date: new Date,
    name: "Sandy",
    content: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!"
  }])

  useEffect(() => { }, [hostId])

  const getReviewAverage = () => {
    const average = reviews.reduce((accumulator, review) => accumulator + review.rating, 0) / reviews.length
    return <h1>{average.toFixed(1)}</h1>
  }

  const getReviewStars = (rating: number) => {
    if (rating > 5) { rating = 5 }
    const stars: JSX.Element[] = []
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<BsStarFill className={classes.stars} color="orange" />)
    }
    if (stars.length < 5) {
      // calculate remainder add bsstarfill if needed
      if (rating % Math.floor(rating) !== 0) {
        stars.push(<BsStarHalf className={classes.stars} color="orange" />)
      }

      while (stars.length < 5) {
        stars.push(<BsStar className={classes.stars} color="orange" />)
      }
      // add blank stars otherwise
    }
    return stars

  }

  return (
    <main className={classes.reviewContainer}>
      <div className={classes.topbar}>
        <h1>Your reviews</h1>
        <span>last <i>30 days</i></span>
      </div>
      <div className={classes.reviewSummary}>
        <div className={classes.reviewSummaryTitle}>
          {reviews.length > 0 ? <><h3>{getReviewAverage()}</h3>
            <BsStarFill className={classes.stars} color="orange" />
            <span>overall rating</span></> : <h2>You have no reviews!</h2>}
        </div>
        <div className={classes.reviewSummaryGraphic}>
          <img className={classes.reviewGraphic} src={ReviewTempImage}></img>
        </div>
      </div>
      <h3>Reviews{reviews.length > 0 && ` (${reviews.length})`}</h3>
      {reviews.map((review) =>
        <section className={classes.reviewContent}>
          <div>
            {getReviewStars(review.rating)}
          </div>
          <div className={classes.reviewTitleBar}>
            <span>{review.name}</span><i>-{formatDateToDateString(review.date)}</i>
          </div>
          <p className={classes.reviewParagraph}>{review.content}</p>
        </section>)}
    </main>
  )
}
