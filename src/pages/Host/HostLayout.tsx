import { CSSProperties } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classes from "../../css-modules/HostDetails.module.css"

export default function HostLayout({ hostId }: { hostId: string }) {
  const navStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  const activeNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? navStyle : undefined;

  return (
    <>
      <nav className={classes.hostNav}>
        <NavLink style={activeNavStyle} to="." end>
          Dashboard
        </NavLink>
        <NavLink style={activeNavStyle} to="income">
          Income
        </NavLink>
        <NavLink style={activeNavStyle} to="vans">
          Vans
        </NavLink>
        <NavLink style={activeNavStyle} to="reviews">
          Reviews
        </NavLink>
        <NavLink style={activeNavStyle} to="/logout">
          Log out
        </NavLink>
      </nav>
      {/* We pass the host Id as an outlet context since so many components below use it */}
      <Outlet context={hostId} />
    </>
  );
}
