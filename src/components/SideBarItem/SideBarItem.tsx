import React from "react";
import "./SideBarItem.css";
import { useNavigate } from "react-router-dom";

interface SideBarItemProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  destinition?: string
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  text,
  icon,
  active = false,
  destinition
}) => {
  const className = `sideBarItem ${active ? "active" : ""}`.trim();
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(destinition)} className={className}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SideBarItem;
