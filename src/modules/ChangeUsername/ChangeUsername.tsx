import React, { useState } from "react";
import "./ChangeUsername.css";
import api from "../../services/baseURL";

const ChangeUsername = () => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("user")).username
  );
  const [error, setError] = useState("");

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("send request");

    try {
      const response = await api.patch(
        "/api/me",
        { username }
      );

      const updateCount = response.data;

      console.log("PATCH /api/me response:", response.data);

      if (updateCount.updateCount === 1) {
        let user = JSON.parse(localStorage.getItem("user") || "{}");

        user.username = username;

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setError("Username didn't change");
      }
    } catch (err) {
      console.error("PATCH error:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
  };

  return (
    <form className="changeUsername" onSubmit={handleOnSubmit}>
      <label htmlFor="">Change your username:</label>
      <input
        type="text"
        placeholder="New username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">save</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ChangeUsername;
