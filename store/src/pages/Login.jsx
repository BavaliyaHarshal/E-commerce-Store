import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { fetchResource } from "../api/storeData";

const Login = memo(() => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const users = await fetchResource("users");
      const user = users.find(
        (u) => u.username === form.username && u.password === form.password
      );
      if (user) {
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("username", form.username);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <style>
        {`
          .login-container {
            min-height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .login-form {
            min-width: 300px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(60,60,90,0.08);
            padding: 32px 24px;
          }
          .login-form h3 {
            font-weight: 700;
            color: #4f8cff;
            margin-bottom: 24px;
            text-align: center;
          }
          .login-form .form-label {
            font-weight: 500;
            color: #333;
          }
          .login-form .form-control {
            border-radius: 6px;
            border: 1px solid #cfd8dc;
            margin-bottom: 12px;
          }
          .login-form .form-control:focus {
            border-color: #4f8cff;
            box-shadow: 0 0 0 0.15rem rgba(79,140,255,0.12);
          }
          .login-form .btn {
            font-weight: 600;
            border-radius: 6px;
            margin-bottom: 8px;
            transition: background-color 0.2s;
          }
          .login-form .btn-primary {
            background-color: #4f8cff;
            border: none;
          }
          .login-form .btn-primary:active,
          .login-form .btn-primary:focus {
            background-color: #3a6ed1;
          }
          .login-form .alert {
            margin-bottom: 16px;
          }
        `}
      </style>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="mb-4">Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              type="text"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              required
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={!form.username || !form.password}
          >
            Login
          </button>
          <button
            className="btn btn-primary w-100 mt-2"
            type="button"
            onClick={() => navigate("/add-user")}
          >
            Add User
          </button>
        </form>
      </div>
    </>
  );
});

export default Login;
