import React from "react";
import AboutBg from "../../assets/aboutbg.png";
import { Link } from "react-router-dom";
import classes from "../../css-modules/AboutPage.module.css"

export default function About(): React.JSX.Element {
  return (
    <section className={classes.aboutPage}>
      <img className={classes.aboutImg} src={AboutBg} />
      <h1>
        Don't squeeze in a sedan when you could relax in a van.
      </h1>
      <section>
        Our mission is to enliven your road trip with the perfect travel van
        rental. Our vans are recertified before each trip to ensure your travel
        plans can go off without a hitch. (Hitch costs extra 😉)
      </section>
      <section>
        Our team is full of vanlife enthusiasts who know firsthand the magic of
        touring the world on 4 wheels.
      </section>
      <div className={classes.explore}>
        <h2>
          Your destination is waiting. Your van is ready.
        </h2>
        <Link
          className={classes.aboutButton}
          to="/vans"
        >
          Explore our vans
        </Link>
      </div>
    </section>
  );
}
