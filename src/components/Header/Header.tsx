import React, { useState } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { Button } from "../Button";

const Header = () => {
  const [lang, setLang] = useState("en");

  const handelLanguage = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  return (
    <div className="header">
      <div className="logoBlock">
        <img src={codelangLogo} alt="codelang logo" />
        <span>codelang</span>
      </div>
      <div>
        <Button>sign out</Button>
        <Button onClick={handelLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang}</span>
        </Button>
      </div>
    </div>
  );
};


export default Header;
