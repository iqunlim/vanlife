import React from "react";
import { Link } from "react-router-dom";

export default function Header(): React.ReactElement {
  return (
    <header>
      <Link className="branding-title" to="/">
        #VANLIFE
      </Link>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
  );
}
