import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "../css-modules/Header.module.css"

export default function Header(): React.ReactElement {
  const activeMainNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.nav : undefined;

  return (
    <header>
      <Link className={classes.title} to="/">
        #VANLIFE
      </Link>
      <nav>
        <NavLink to="host" className={activeMainNavStyle}>
          Host
        </NavLink>
        <NavLink to="/about" className={activeMainNavStyle}>
          About
        </NavLink>
        <NavLink to="/vans" className={activeMainNavStyle}>
          Vans
        </NavLink>
      </nav>
    </header>
  );
}
