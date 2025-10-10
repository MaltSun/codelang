import React from "react";
import "./SideBarItem.css";
import { useNavigate } from "react-router-dom";

interface SideBarItemProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  destinition?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  text,
  icon,
  active = false,
  destinition,
}) => {
  const className = `sideBarItem ${active ? "active" : ""}`.trim();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(destinition);
  };

  return (
    <button onClick={handleNavigate} className={className}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SideBarItem;
