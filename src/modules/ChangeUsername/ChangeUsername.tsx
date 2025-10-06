import React, { useState } from "react";
import "./ChangeUsername.css";
import api from "../../services/baseURL";

const ChangeUsername = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
  const [error, setError] = useState("");

  const handleOnSubmitChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.patch("/me", { username: user });

      const updateUser = response.data.data;

      if (updateUser) {
        sessionStorage.setItem("user", JSON.stringify(updateUser));

        setUser("");
        window.location.reload();
      } else {
        setError("Username didn't change");
      }
    } catch (err: any) {
      console.error("PATCH error:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <form className="changeUsername" onSubmit={handleOnSubmitChange}>
      <label>Change your username:</label>
      <input
        type="text"
        placeholder="New username"
        onChange={handleChangeUsername}
      />
      <button type="submit">save</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ChangeUsername;
