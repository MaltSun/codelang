import api from "../../services/baseURL";
import React, { useState } from "react";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [newPass, setNewPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [oldPass, setOldPassword] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const oldPassword = formData.get("oldPass")?.toString() || "";
    const newPassword = formData.get("newPass")?.toString() || "";

    if (handleValidation) {
      setError("Passwords do not match or invalid format");
      setLoading(false);
      return;
    }

    try {
      const response = await api.patch("/me/password", {
        oldPassword,
        newPassword,
      });

      const updatedUser = response.data;
      if (updatedUser) {
        alert("Success");
        form.reset();
      } else {
        setError("Password didn't change");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return newPass === confirmPass && passwordRegex.test(newPass);
  };

  const handleInputNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <form className="changeUsername" onSubmit={handleOnSubmit}>
        <label>Change your password:</label>
        <input
          type="password"
          placeholder="Old password"
          onChange={handleOldPassword}
        />
        <input
          type="password"
          placeholder="New password"
          onChange={handleInputNewPassword}
        />
        <input
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmPassword}
        />
        <button type="submit">Change password</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default ChangePassword;
