import React, { useState } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { Button } from "../Button";

interface HeaderProps {
  signOut?: boolean;
}

const Header: React.FC<HeaderProps> = ({ signOut = true }) => {
  const [lang, setLang] = useState("en");

  const handleLanguage = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  return (
    <div className="header">
      <div className="logoBlock">
        <img src={codelangLogo} alt="codelang logo" />
        <span>codelang</span>
      </div>
      <div>
        {signOut && <Button>sign out</Button>}
        <Button onClick={handleLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
