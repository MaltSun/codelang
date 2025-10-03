import React from "react";
import "./SideBar.css";
import { SideBarItem } from "../../components/SideBarItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GroupIcon from "@mui/icons-material/Group";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import { codelangLogo } from "../../ui";

interface SideBar {
  activeItem: string;
}

const SideBar: React.FC<SideBar> = ({ activeItem }) => {
  const addActive = (id: string) => {
    if (activeItem === id) {
      return true;
    } else return false;
  };
  return (
    <div className="sideBar">
      <div className="profileSideBar">
        <img src={codelangLogo} alt="codelang logo" />
        <span>user name</span>
        <span></span>
      </div>
      <hr />
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
