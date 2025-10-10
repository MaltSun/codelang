import React, { lazy, Suspense, useState } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { useNavigate } from "react-router-dom";

const Button = lazy(() => import("../Button/Button"));

interface HeaderProps {
  signOut?: boolean;
  askQuestion?: boolean;
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ askQuestion = false, onClick }) => {
  const [lang, setLang] = useState("en");
  const [isLoged, setLogIn] = useState(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLanguage = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logoBlock">
        <img src={codelangLogo} alt="codelang logo" />
        <span>codelang</span>
      </div>
      <div>
        {" "}
        <Suspense>
          {isLoged &&
            (askQuestion ? (
              <Button onClick={onClick}>ask question</Button>
            ) : (
              <Button onClick={handleLogOut}>sign out</Button>
            ))}
        </Suspense>
        <Button onClick={handleLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
