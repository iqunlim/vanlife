import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIError, Creds, loginUser } from "../../api";

type StatusState = "idle" | "submitting";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<StatusState>("idle");
  const [error, setError] = useState<APIError | Error | null>(null);
  const [loginFormData, setLoginFormData] = React.useState<Creds>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => console.log(data))
      .then(() => navigate("/host", { replace: true }))
      .catch((err) => {
        if (
          typeof err === "object" &&
          err !== null &&
          "statusText" in err &&
          "status" in err
        ) {
          const apiErr = err as APIError;
          setError(apiErr);
        } else {
          const newErr = new Error("Unknown error occured");
          console.error(err);
          setError(newErr);
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
      {location.state?.msg && <h2>{location.state.msg}</h2>}
      <div className="login-container">
        <h1>Sign in to your account</h1>
        {error?.message && (
          <h2 style={{ color: "red" }}>Error: {error.message}</h2>
        )}
        <form onSubmit={handleSubmit} className="login-form">
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
              status === "submitting" ? "login-container__button--faded" : ""
            }
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
