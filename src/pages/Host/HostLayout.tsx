import { CSSProperties } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const navStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  const activeNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? navStyle : undefined;

  return (
    <>
      <nav className="host-nav">
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
      </nav>
      <Outlet />
    </>
  );
}
