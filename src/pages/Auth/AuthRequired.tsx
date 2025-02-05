import { Outlet, Navigate } from "react-router-dom";

export default function AuthRequired({ authState }: { authState: boolean }) {

  if (import.meta.env.VITE_DISABLE_AUTH === "true") {
    authState = true;
  }

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
