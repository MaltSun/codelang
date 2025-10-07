import React, { useState } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signOut?: boolean;
  askQuestion?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  signOut = true,
  askQuestion = false,
}) => {
  const [lang, setLang] = useState("en");
  
  const navigate = useNavigate()

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
        {signOut &&
          (askQuestion ? (
            <Button>ask question</Button>
          ) : (
            <Button onClick={handleLogOut}>sign out</Button>
          ))}

        <Button onClick={handleLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
