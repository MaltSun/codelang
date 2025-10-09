import React, { useMemo } from "react";
import "./UserCard.css";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: number;
  username: string;
  role: string;
}

const UserCard: React.FC<UserCardProps> = React.memo(({ id, username, role }) => {
  const navigate = useNavigate();

const handleNavigate=()=>{
  navigate(`/user/${id}`, {})
}

  return (
    <div className="userCard">
      <div onClick={handleNavigate}>
        <PersonIcon fontSize="large" />
      </div>
      <div>
        <h1>{username}</h1>
        <span>
          {id} {role}
        </span>
      </div>
    </div>
  );
});

export default UserCard;
