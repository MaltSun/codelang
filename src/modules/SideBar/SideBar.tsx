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

interface SideBarProps {
  activeItem: string;
}

const SideBar: React.FC<SideBarProps> = ({ activeItem }) => {
  const addActive = (id: string) => {
    if (activeItem === id) {
      return true;
    } else return false;
  };

  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const navigate = useNavigate();

  return (
    <div className="sideBar">
      {user.username && (
        <>
        <div onClick={() => navigate("/account")} className="profileSideBar">
          <img src={codelangLogo} alt="codelang logo" />
          <span>{user.username}</span>
        </div>
        <hr />
        </>
      )}

      
      <div>
        <SideBarItem
          active={addActive("home")}
          destinition="/"
          text={"Home"}
          icon={<HomeIcon></HomeIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("account")}
          destinition="/account"
          text={"My Account"}
          icon={<AccountBoxIcon></AccountBoxIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("snippets")}
          destinition="/snippet"
          text={"Post snippet"}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("mySnippets")}
          destinition="/myPost"
          text={"My snippets"}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("questions")}
          destinition="/question"
          text={"Questions"}
          icon={<PsychologyAltIcon></PsychologyAltIcon>}
        ></SideBarItem>
        <SideBarItem
          active={addActive("users")}
          text={"Users"}
          destinition="/users"
          icon={<GroupIcon></GroupIcon>}
        ></SideBarItem>
      </div>
    </div>
  );
};

export default SideBar;
