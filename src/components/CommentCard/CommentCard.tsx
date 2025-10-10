import React, { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./CommentCard.css";

interface CommentCardProps {
  id: number;
  username: string;
  content: string;
}

const CommentCard: React.FC<CommentCardProps> = React.memo(({
  id,
  username = "Unknown User",
  content,
}) => {
  return (
    <div className="commentCard" key={id}>
      <div className="commentCardHeader">
        <PersonIcon />
        {username}
      </div>
      <div className="content">{content}</div>
    </div>
  );
});

export default CommentCard;
