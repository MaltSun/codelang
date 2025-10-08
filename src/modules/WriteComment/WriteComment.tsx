import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./WriteComment.css";
import api from "@/services/baseURL";

interface WriteCommentProps {
  snippetId: number;
}

const WriteComment: React.FC<WriteCommentProps> = ({
  snippetId,
}) => {
  const [code, setCode] = useState("");

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/comments", {
        content: code,
        snippetId
      });

      setCode('')

      if (response.data) {
        alert("Success");
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <form onSubmit={createComment} className="commentInput">
      <textarea
        onChange={handleSetCode}
        placeholder="write a comment"
        value={code}
      />
      <button type="submit">
        <SendRoundedIcon />
      </button>
    </form>
  );
};

export default WriteComment;
