import { Link } from "react-router-dom";
import classes from "../css-modules/Main.module.css"
export default function Main() {
  return (
    <main className={classes.mainPage}>
      <h1 className={classes.header}>
        You got the travel plans, we got the travel vans.
      </h1>
      <h2 className={classes.header}>
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </h2>
      <Link
        className="orange-button wide-button"
        style={{ marginTop: "20px", fontWeight: 700 }}
        to="/vans"
      >
        Find your van
      </Link>
    </main>
  );
}
