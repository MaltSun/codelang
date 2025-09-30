import React from "react";
import "./SideBarItem.css";

interface SideBarItem {
  text: string;
  icon: React.ReactNode;
}

const SideBarIte: React.FC<SideBarItem> = ({ text, icon }) => {
  return (
    <div className="sideBarItem">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SideBarIte;
