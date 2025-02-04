import { Link } from "react-router-dom";
import classes from "../css-modules/NotFound.module.css"

export default function NotFoundPage() {
  return (
    <div className={classes.notfoundPage}>
      <h1>Sorry, the page you were looking for was not found</h1>
      <Link
        to="/"
        className={classes.backButton}
      >
        Return to Home
      </Link>
    </div>
  );
}
