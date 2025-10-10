import { useTranslation } from "react-i18next";
import api from "../../services/baseURL";
import React, { useState } from "react";

interface ChangePasswordProps {
  onSubmit?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }) => {
  const [oldPass, setOldPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const handleValidation = (): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!oldPass) return false;
    if (newPass !== confirmPass) return false;
    if (!passwordRegex.test(newPass)) return false;
    return true;
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;

    if (!handleValidation()) {
      setError(
        "Passwords do not match, invalid format, or old password is empty"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.patch("/me/password", {
        oldPassword: oldPass,
        newPassword: newPass,
      });

      if (response.data) {
        alert("Password successfully changed!");
        onSubmit?.();
      } else {
        setError("Password didn't change");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);

      form.reset();
      setError("");
    }
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
        <label>{t("change_your_pass")}:</label>
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
        <button type="submit">{t("change_pass")}</button>
        {isLoading && <p>{t("loading")}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default ChangePassword;
