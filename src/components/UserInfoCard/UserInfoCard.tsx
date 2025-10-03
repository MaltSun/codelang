import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { codelangLogo } from "../../ui";
import "./UserInfoCard.css";
import api from "../../services/baseURL";

const UserInfoCard = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [statistic, setStatistic] = useState<any>({});

  const handleStatistic = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await api.get(`/api/users/${user.id}/statistic`);

      console.log("STATISTIC RESPONSE:", response.data.data);

      if (response.data.data.statistic) {
        const data = response.data.data;

        console.log(data);

        setStatistic(data.statistic);
        localStorage.setItem("statistic", JSON.stringify(data.statistic));
        setSuccess("Get statistic successful");
      } else {
        setError("No statistic found");
      }
    } catch (err) {
      console.error("Statistic fetch error:", err);
      setError("An error occurred while trying to load statistics.");
    }
  };

  useEffect(() => {
    handleStatistic();
  }, []);
  
  return (
    <div className="userInformation">
      <div>
        <img src={codelangLogo} alt="user icon" />
        <div className="userInfo">
          <b>{user.username}</b>
          <p> Id: {user.id}</p>
          <p> Role: {user.role}</p>

          <div className="userAccOper">
            <button id="logoutButton">
              <LogoutOutlinedIcon />
            </button>
            <button id="deleteButton">
              <DeleteOutlineOutlinedIcon />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p>Rating: {statistic?.rating ?? "-"}</p>
        <p>Snippets: {statistic?.snippetsCount ?? 0}</p>
        <p>Comments: {statistic?.commentCount ?? 0}</p>
        <p>Likes: {statistic?.likesCount ?? 0}</p>
        <p>Dislikes: {statistic?.dislikesCount ?? 0}</p>
        <p>Questions: {statistic?.questionsCount ?? 0}</p>
        <p>Correct Answer: {statistic?.correctAnswerCount ?? 0}</p>
        <p>Regular Answer: {statistic?.regularAnswerCount ?? 0}</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserInfoCard;
