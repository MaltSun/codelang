import React from "react";
import "./LoginPage.css";
import { LoginForm } from "../../modules/LoginForm";
import { Header } from "../../components/Header";
const LoginPage = () => {
  return (
    <div className="loginPage">
      <Header signOut={false}/>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
