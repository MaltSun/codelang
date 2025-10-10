import React from "react";
import "./SideBar.css";
import { SideBarItem } from "../../components/SideBarItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GroupIcon from "@mui/icons-material/Group";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import { codelangLogo } from "../../ui";
import { useNavigate } from "react-router-dom";

import { AppRoutes } from "@/router";
import { useTranslation } from "react-i18next";

interface SideBarProps {
  activeItem: string;
}

const SideBar: React.FC<SideBarProps> = ({ activeItem }) => {
  const addActive = (id: string) => {
    if (activeItem === id) {
      return true;
    } else return false;
  };
  const { t, i18n } = useTranslation();
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const navigate = useNavigate();

  return (
    <div className="sideBar">
      {user.username && (
        <>
          <div
            onClick={() => navigate(AppRoutes.ACCOUNT)}
            className="profileSideBar"
          >
            <img src={codelangLogo} alt="codelang logo" />
            <span>{user.username}</span>
          </div>
          <hr />
        </>
      )}

      <div>
        <SideBarItem
          active={addActive("home")}
          destinition={AppRoutes.HOME}
          text={t("home")}
          icon={<HomeIcon></HomeIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("account")}
          destinition={AppRoutes.ACCOUNT}
          text={t("my_acc")}
          icon={<AccountBoxIcon></AccountBoxIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("snippets")}
          destinition={AppRoutes.SNIPPET}
          text={t("post_snipp")}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("mySnippets")}
          destinition={AppRoutes.MY_SNIPPETS}
          text={t("my_snipp")}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("questions")}
          destinition={AppRoutes.QUESTIONS}
          text={t("questions")}
          icon={<PsychologyAltIcon></PsychologyAltIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("users")}
          text={t("users")}
          destinition={AppRoutes.USERS}
          icon={<GroupIcon></GroupIcon>}
        ></SideBarItem>
      </div>
    </div>
  );
};

export default SideBar;
