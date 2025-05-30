import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { postResource } from "../api/storeData";

const AddUser = memo(() => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await postResource("users", {
        username: form.username,
        password: form.password,
      });
      alert("User added successfully!");
      setForm({ username: "", password: "", confirmPassword: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to add user!");
    }
    navigate("/products")
  };
  return (
    <>
      <Header />

      <style>
        {`
          .add-user-container {
            min-height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(120deg, #fdf6e3 0%, #f5e1ff 100%);
          }
          .add-user-form {
            min-width: 300px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(60,60,90,0.08);
            padding: 32px 24px;
          }
          .add-user-form h3 {
            font-weight: 700;
            color: #4f8cff;
            margin-bottom: 24px;
            text-align: center;
          }
          .add-user-form .form-label {
            font-weight: 500;
            color: #333;
          }
          .add-user-form .form-control {
            border-radius: 6px;
            border: 1px solid #cfd8dc;
            margin-bottom: 12px;
          }
          .add-user-form .form-control:focus {
            border-color: #4f8cff;
            box-shadow: 0 0 0 0.15rem rgba(79,140,255,0.12);
          }
          .add-user-form .btn {
            font-weight: 600;
            border-radius: 6px;
            margin-bottom: 8px;
            transition: background-color 0.2s;
          }
          .add-user-form .btn-primary {
            background-color: #4f8cff;
            border: none;
          }
          .add-user-form .btn-primary:active,
          .add-user-form .btn-primary:focus {
            background-color: #3a6ed1;
          }
        `}
      </style>

      <div className="add-user-container">
        <form onSubmit={handleSubmit} className="add-user-form">
          <h3 className="mb-4">Add User</h3>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              required
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              required
              name="confirmPassword"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add User
          </button>
        </form>
      </div>
    </>
  );
});

export default AddUser;
