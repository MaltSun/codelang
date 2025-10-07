import React from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Goal } from "../../ui";
import "./QuestionCard.css";
interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  username: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  description,
  username,
}) => {
  return (
    <div key={id} className="questionCard">
      <div>
        <img src={Goal} alt="goal" />
        <div>
          <h2>{title}</h2>
          <p>asked by user: {username}</p>
        </div>
      </div>
      <p className="description">{description}</p>
      <RemoveRedEyeOutlinedIcon style={{ color: "blue" }} />
    </div>
  );
};

export default QuestionCard;
