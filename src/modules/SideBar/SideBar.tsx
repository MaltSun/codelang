import React from "react";
import "./SideBar.css";
import { SideBarItem } from "../../components/SideBarItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GroupIcon from "@mui/icons-material/Group";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import { codelangLogo } from "../../ui";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="profileSideBar">
        <img src={codelangLogo} alt="codelang logo" />
        <span>user name</span>
        <span></span>
      </div>
      <hr />
      <div>
        <SideBarItem text={"Home"} icon={<HomeIcon></HomeIcon>}></SideBarItem>
        <SideBarItem
          text={"My Account"}
          icon={<AccountBoxIcon></AccountBoxIcon>}
        ></SideBarItem>
        <SideBarItem
          text={"Post snippet"}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          text={"My snippets"}
          icon={<SnippetFolderIcon></SnippetFolderIcon>}
        ></SideBarItem>
        <SideBarItem
          text={"Qustions"}
          icon={<PsychologyAltIcon></PsychologyAltIcon>}
        ></SideBarItem>
        <SideBarItem
          text={"Users"}
          icon={<GroupIcon></GroupIcon>}
        ></SideBarItem>
      </div>
    </div>
  );
};

export default SideBar;
