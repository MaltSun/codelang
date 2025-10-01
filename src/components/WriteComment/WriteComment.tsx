import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./WriteComment.css"

const WriteComment = () => {
  return (
    <div className="commentInput">
      <textarea placeholder="write a comment" />
      <button>
        <SendRoundedIcon />
      </button>
    </div>
  );
};

export default WriteComment;
