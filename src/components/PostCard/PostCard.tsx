import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import PersonIcon from "@mui/icons-material/Person";
import "./PostCard.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useNavigate } from "react-router-dom";
import api from "../../services/baseURL";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { EditPost } from "@/modules/EditPost";

interface PostCardProps {
  id: number;
  username: string;
  language?: string;
  code?: string;
  likesNumber: number;
  dislikesNumber: number;
  commentsNumber: number;
  readonly?: boolean;
  canEdit?: boolean;
  openEdit?: () => void;
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
    canEdit = false,
  }) => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleSetClose = () => {
      setOpen(false);
    };

    const navigate = useNavigate();

    const handleMark = async (mark: string) => {
      try {
        const response = await api.post(`/snippets/${id}/mark`, { mark });

        const newMark = response.data;

        if (newMark) {
          console.log(newMark);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div key={id} className="postCard">
        {isOpen && (
          <EditPost
            onClose={handleSetClose}
            id={id}
            lang={language}
            code={code}
          />
        )}

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
          options={{
            selectOnLineNumbers: true,
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
          }}
        />

        <div className="postCardFooter">
          <span>
            <span>
              <button
                onClick={() => {
                  handleMark("like");
                }}
              >
                <ThumbUpOffAltIcon sx={{ color: red[400] }} />
              </button>

              {likesNumber}
            </span>
            <span>
              <button
                onClick={() => {
                  handleMark("dislike");
                }}
              >
                <ThumbDownOffAltIcon sx={{ color: red[400] }} />
              </button>

              {dislikesNumber}
            </span>
          </span>
          <span>
            {canEdit && (
              <button onClick={handleOpen}>
                <BorderColorOutlinedIcon sx={{ color: red[400] }} />
              </button>
            )}
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
                  },
                })
              }
            >
              <ChatBubbleOutlineIcon sx={{ color: red[400] }} />
              {commentsNumber}
            </button>
          </span>
        </div>
      </div>
    );
  }
);

export default PostCard;
