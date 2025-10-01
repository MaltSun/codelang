import React from "react";
import MonacoEditor from "react-monaco-editor";
import PersonIcon from "@mui/icons-material/Person";
import "./PostCard.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {useNavigate } from "react-router-dom";
import PostPage from "@/pages/PostPage/PostPage";

interface PostCardProps {
  id: number;
  username: string;
  language?: string;
  code?: string;
  likesNumber: number;
  dislikesNumber: number;
  commentsNumber: number;
}

const PostCard: React.FC<PostCardProps> = React.memo(
  ({
    id,
    username,
    language,
    code,
    likesNumber,
    dislikesNumber,
    commentsNumber,
  }) => {
    const options = {
      selectOnLineNumbers: true,
    };

    const navigate = useNavigate();

    return (
      <div key={id} className="postCard">
        <div className="postCardHeader">
          <span>
            <PersonIcon />
            {username}
          </span>
          {language}
        </div>

        <MonacoEditor
          width="100%"
          height="200px"
          language={language}
          theme="vs-light"
          value={code}
          options={options}
        />
        <div className="postCardFooter">
          <span>
            <span>
              <button>
                <ThumbUpOffAltIcon sx={{ color: red[400] }} />
              </button>

              {likesNumber}
            </span>
            <span>
              <button>
                <ThumbDownOffAltIcon sx={{ color: red[400] }} />
              </button>

              {dislikesNumber}
            </span>
          </span>
          <button
            onClick={() =>
              navigate("/post", {
                state: {
                  id,
                  username,
                  language,
                  code,
                  likesNumber,
                  dislikesNumber,
                  commentsNumber,                  
                }
              })
            }
          >
            <ChatBubbleOutlineIcon sx={{ color: red[400] }} />
            {commentsNumber}
          </button>
        </div>
      </div>
    );
  }
);

export default PostCard;
