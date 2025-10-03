import { useNavigate } from "react-router-dom";
import api from "../../services/baseURL";
import React, { useState } from "react";
import "./LoginForm.css";
import { Button } from "../../components/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.data) {
        const { id, username: userName, role } = response.data.data;
        setSuccess("Login successful!");
        localStorage.setItem(
          "user",
          JSON.stringify({
            id,
            username: userName,
            role,
          })
        );
        navigate("/");
      } else {
        setError("Invalid response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "An error occurred while trying to log in. Please try again later."
      );
    }
  };

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <Button type="submit">Login</Button>

          <Button type="button" onClick={() => navigate("/reg")}>
            Register
          </Button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default LoginForm;
