import { Outlet, Navigate } from "react-router-dom";

export default function AuthRequired({ authState }: { authState: boolean }) {
  return authState ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ msg: "Please log in to continue" }}
      replace
    />
  );
}
