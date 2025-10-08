import React, { useState } from "react";
import "./Header.css";
import { TranslateIcon, codelangLogo } from "../../ui";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { CreateQuestion } from "@/modules/CreateQuestion";
import ProtectedRoute from "@/services/ProtectedRoute";

interface HeaderProps {
  signOut?: boolean;
  askQuestion?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  signOut = true,
  askQuestion = false,
}) => {
  const [lang, setLang] = useState("en");
  const [isOpen, setOpen] = useState(false);
  const [isLoged, setLogIn] = useState(false);

  const navigate = useNavigate();

  const handleLanguage = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  const handleLogOut = () => {
    navigate("/");
    sessionStorage.removeItem("user");
  };

  const handleOpenQuestion = () => {
    setOpen(true);
  };
  const handleCloseQuestion = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="logoBlock">
        <img src={codelangLogo} alt="codelang logo" />
        <span>codelang</span>
      </div>
      <div>
        {isLoged &&
          (askQuestion ? (
            <Button onClick={handleOpenQuestion}>ask question</Button>
          ) : (
            <Button onClick={handleLogOut}>sign out</Button>
          ))}

        <Button onClick={handleLanguage}>
          <img src={TranslateIcon} alt="translator" />
          <span>{lang}</span>
        </Button>
      </div>
      {isOpen && <CreateQuestion onClose={handleCloseQuestion} />}
    </div>
  );
};

export default Header;
