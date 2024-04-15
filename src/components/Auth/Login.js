// src/components/Auth/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import { useUserContext } from "../../context/UserContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigation = useNavigate();
  const { login } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here

    try {
      const response = await fetch("https://localhost:7063/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        login({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          id: user.userId,
          isAdmin: user.isAdmin,
        });

        localStorage.setItem("user", JSON.stringify(user));

        // Store userId in local storage
        localStorage.setItem("userId", user.userId);

        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });

        setTimeout(() => {
          // navigation("/dashboard");

          const campaignId = localStorage.getItem("campaignIdToRedirect");
          if (campaignId) {
            localStorage.removeItem("campaignIdToRedirect");
            navigation(`/campaign/${campaignId}`);
          } else {
            navigation("/dashboard");
          }
        }, 1000);

        // console.log("Login successful");
      } else {
        toast.error("Incorrect Email or Password", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }

      // const errorResponse = await response.json();
      // console.error("Login failed", errorResponse);
    } catch (error) {
      console.error("Error durin login:", error);
    }
    // console.log("Login submitted:", formData);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
      <ToastContainer />
    </div>
  );
}

export default Login;
