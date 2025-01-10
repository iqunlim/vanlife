import React, { CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header(): React.ReactElement {
  const mainNavStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  const activeMainNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? mainNavStyle : undefined;

  return (
    <header>
      <Link className="branding-title" to="/">
        #VANLIFE
      </Link>
      <nav>
        <NavLink to="host" style={activeMainNavStyle}>
          Host
        </NavLink>
        <NavLink to="/about" style={activeMainNavStyle}>
          About
        </NavLink>
        <NavLink to="/vans" style={activeMainNavStyle}>
          Vans
        </NavLink>
      </nav>
    </header>
  );
}
