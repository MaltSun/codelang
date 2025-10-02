import React, { useState } from "react";
import "./RegistrationForm.css";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import api from "../../services/baseURL";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await api.post("/api/register", {
        username,
        password,
      });

      const user = response.data;

      if (user) {
        setSuccess("Registration successful!");
        // localStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     id: user.id,
        //     username: user.username,
        //     role: user.role,
        //   })
        // );
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Server error:", err.response.data); 
        setError(
          `Error ${err.response.status}: ${
            err.response.data.message || "Registration failed"
          }`
        );
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="regForm">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div>
          <Button type="submit">Register</Button>
          <Button type="button" onClick={() => navigate("/login")}>
            Have an account
          </Button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default RegistrationForm;
