import { Outlet, Navigate } from "react-router-dom";

export default function AuthRequired() {
  const authenticated = false;

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ msg: "Please log in to continue" }}
      replace
    />
  );
}
