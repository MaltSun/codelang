import React, { Suspense, useState,lazy, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Goal } from "../../ui";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import "./QuestionCard.css";
const EditQuestion = lazy(()=>import("@/modules/EditQuestion/EditQuestion")) ;

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  username: string;
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(
  ({ id, title, description, username }) => {
    const [isOpen, setOpen] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user")) || {};

    const handleOpen =() => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div key={id} className="questionCard">
        {isOpen && (
          <Suspense>
            <EditQuestion
              id={id}
              title={title}
              description={description}
              onClose={handleClose}
            />
          </Suspense>
        )}
        <div className="questionHeader">
          <div>
            <img src={Goal} alt="goal" />

            <span>
              <h2>{title}</h2>
              <p>asked by user: {username}</p>
            </span>
          </div>

          {username === user.username && (
            <button onClick={handleOpen}>
              <BorderColorOutlinedIcon />
            </button>
          )}
        </div>
        <p className="description">{description}</p>
        <RemoveRedEyeOutlinedIcon style={{ color: "blue" }} />
      </div>
    );
  }
);

export default QuestionCard;
