import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "../../css-modules/Login.module.css"
import { APIError, Creds } from "../../api/types";
import FirebaseErrorToAPIError, { loginHost } from "../../api/api";
import { FirebaseError } from "firebase/app";

type StatusState = "idle" | "submitting";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<StatusState>("idle");
  const [error, setError] = useState<APIError | null>(null);
  const [loginFormData, setLoginFormData] = React.useState<Creds>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    loginHost(loginFormData.email, loginFormData.password)
      .then(() => navigate("/host", { replace: true }))
      .catch((err) => {
        if (err instanceof FirebaseError) {
          const apiErr = FirebaseErrorToAPIError(err)
          setError(apiErr)
        } else {
          const apiErr = new APIError("Unknown error", "Unknown error", 500)
          setError(apiErr)
        }
      })
      .finally(() => setStatus("idle"));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <div className={classes.loginContainer}>
        <h1>Sign in to your account</h1>
        {location.state?.msg && <h2>{location.state.msg}</h2>}
        {error?.statusText && (
          <h2 style={{ color: "red" }}>Error: {error.statusText}</h2>
        )}
        <form onSubmit={handleSubmit} className={classes.loginForm}>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            value={loginFormData.email}
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            value={loginFormData.password}
          />
          <button
            disabled={status === "submitting"}
            className={
              status === "submitting" ? classes.loginButton : ""
            }
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
