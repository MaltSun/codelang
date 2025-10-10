import React, { useState } from "react";
import "./RegistrationForm.css";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import api from "../../services/baseURL";
import { AppRoutes } from "@/router";
import { useTranslation } from "react-i18next";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const { t, i18n } = useTranslation();

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
      const response = await api.post("/register", {
        username,
        password,
      });

      const user = response.data;

      if (user) {
        setSuccess("Registration successful!");

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

  const handleNavigate = () => {
    navigate(AppRoutes.LOGIN);
  };

  return (
    <div className="regForm">
      <h1>{t("reg")}</h1>
      <form onSubmit={handleSubmit}>
        <label>{t("username")}</label>
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>{t("password")}</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>{t("conf_password")}</label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div>
          <Button type="submit">{t("reg")}</Button>
          <Button type="button" onClick={handleNavigate}>
           {t("have_acc")}
          </Button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default RegistrationForm;
