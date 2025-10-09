import React, { useEffect, useState, lazy, Suspense } from "react";
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

const EditPost = lazy(() => import("@/modules/EditPost/EditPost"));

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
  mark?: "like" | "dislike" | null;
   onSuccess?: () => void;
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
    mark = null,
    onSuccess
  }) => {
    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(false);
    const [likes, setLikes] = useState(likesNumber);
    const [dislikes, setDislikes] = useState(dislikesNumber);
    const [userMark, setUserMark] = useState<"like" | "dislike" | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const stored = sessionStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        if (mark) setUserMark(mark);
      }
    }, [mark]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleMark = async (newMark: "like" | "dislike") => {
      if (!user) {
        alert("You need to login to like or dislike posts.");
        navigate("/login");
        return;
      }

      try {
        if (userMark === newMark) {
          setUserMark(null);
          if (newMark === "like") setLikes((l) => l - 1);
          else setDislikes((d) => d - 1);
        } else {
          if (newMark === "like") {
            setLikes((l) => l + 1);
            if (userMark === "dislike") setDislikes((d) => d - 1);
          } else {
            setDislikes((d) => d + 1);
            if (userMark === "like") setLikes((l) => l - 1);
          }
          setUserMark(newMark);
        }

        await api.post(`/snippets/${id}/mark`, { mark: newMark });
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div key={id} className="postCard">
        {isOpen && (
          <Suspense>
            <EditPost
              onClose={handleClose}
              id={id}
              lang={language}
              code={code}
              onSuccess={onSuccess}
            />
          </Suspense>
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
          <span className="postActions">
            <span>
              <button
                disabled={!user}
                onClick={() => handleMark("like")}
                className={!user ? "disabledBtn" : ""}
                title={!user ? "Login to like" : ""}
              >
                {user && userMark === "like" ? (
                  <ThumbUpIcon sx={{ color: red[400] }} />
                ) : (
                  <ThumbUpOffAltIcon
                    sx={{
                      color: red[400],
                      opacity: user ? 0.6 : 0.3,
                      cursor: user ? "pointer" : "not-allowed",
                    }}
                  />
                )}
              </button>
              {likes}
            </span>

            <span>
              <button
                disabled={!user}
                onClick={() => handleMark("dislike")}
                className={!user ? "disabledBtn" : ""}
                title={!user ? "Login to dislike" : ""}
              >
                {user && userMark === "dislike" ? (
                  <ThumbDownAltIcon sx={{ color: red[500] }} />
                ) : (
                  <ThumbDownOffAltIcon
                    sx={{
                      color: red[400],
                      opacity: user ? 0.6 : 0.3,
                      cursor: user ? "pointer" : "not-allowed",
                    }}
                  />
                )}
              </button>
              {dislikes}
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
                    likesNumber: likes,
                    dislikesNumber: dislikes,
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
