import React from "react";
import { Link } from "react-router-dom";
export default function About(): React.JSX.Element {
  return (
    <main className="about-page">
      <div className="about-img"></div>
      <h1 className="about-page-h1">
        Don't squeeze in a sedan when you could relax in a van.
      </h1>
      <section className="about-section">
        Our mission is to enliven your road trip with the perfect travel van
        rental. Our vans are recertified before each trip to ensure your travel
        plans can go off without a hitch. (Hitch costs extra 😉)
      </section>
      <section className="about-section">
        Our team is full of vanlife enthusiasts who know firsthand the magic of
        touring the world on 4 wheels.
      </section>
      <div className="explore">
        <h2 className="about-page-h2">
          Your destination is waiting. Your van is ready.
        </h2>
        <Link className="button-black md-button" to="/vans">
          Explore our vans
        </Link>
      </div>
    </main>
  );
}
