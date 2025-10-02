import React from "react";
import "./UserCard.css";
import PersonIcon from "@mui/icons-material/Person";

interface UserCardProps {
  id: number;
  username: string;
  role: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, username, role }) => {
  return (
    <div className="userCard">
      <div >
        <PersonIcon fontSize="large"/>
      </div>
      <div >
        <h1>{username}</h1>
        <span>
          {id} {role}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
