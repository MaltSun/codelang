import React, { useState } from "react";
import "./ChangeUsername.css";
import api from "../../services/baseURL";
import { useTranslation } from "react-i18next";

interface ChangeUsernameProps {
  onSubmit?: () => void;
}

const ChangeUsername: React.FC<ChangeUsernameProps> = ({ onSubmit }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const handleOnSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    try {
      const response = await api.patch("/me", { username: user });

      const updateUser = response.data.data;

      if (updateUser) {
        sessionStorage.setItem("user", JSON.stringify(updateUser));
        setUser("");
        onSubmit();
      } else {
        setError("Username didn't change");
      }
    } catch (err: any) {
      console.error("PATCH error:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");

      form.reset();
    }
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <form className="changeUsername" onSubmit={handleOnSubmitChange}>
      <label>{t("change_username")}:</label>
      <input
        type="text"
        placeholder="New username"
        onChange={handleChangeUsername}
      />
      <button type="submit">{t("save")}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ChangeUsername;
