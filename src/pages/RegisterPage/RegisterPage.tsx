import React from "react";
import "./RegisterPage.css";
import { Header } from "../../components/Header";
import RegistrationForm from "../../modules/RegistrationForm/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className="regPage">
      <Header signOut={false} />
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
