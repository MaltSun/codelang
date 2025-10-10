import React, { lazy, Suspense, useState, useEffect } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router";
import { useTranslation } from "react-i18next";

const Button = lazy(() => import("../Button/Button"));

interface HeaderProps {
  signOut?: boolean;
  askQuestion?: boolean;
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ askQuestion = false, onClick }) => {
  const storedLang = sessionStorage.getItem("lang") || "en";
  const [lang, setLang] = useState(storedLang);
  const [isLoged, setLogIn] = useState(!!sessionStorage.getItem("user"));
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

const handleLanguage = () => {
  const newLang = lang === "en" ? "ru" : "en";
  setLang(newLang);
  sessionStorage.setItem("lang", newLang);
  i18n.changeLanguage(newLang);
};


  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setLogIn(false);
    navigate(AppRoutes.HOME);
  };

  return (
    <div className="header">
      <div className="logoBlock">
        <img src={codelangLogo} alt="codelang logo" />
        <span>codelang</span>
      </div>
      <div>
        <Suspense>
          {isLoged &&
            (askQuestion ? (
              <Button onClick={onClick}>{t("ask_question")}</Button>
            ) : (
              <Button onClick={handleLogOut}>{t("sign_out")}</Button>
            ))}
        </Suspense>
        <Button onClick={handleLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang.toUpperCase()}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
