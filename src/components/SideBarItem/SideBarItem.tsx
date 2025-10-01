import React from "react";
import "./SideBarItem.css";

interface SideBarItemProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ text, icon, active = false }) => {
  const className = `sideBarItem ${active ? "active" : ""}`.trim();

  return (
    <div className={className}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SideBarItem;
