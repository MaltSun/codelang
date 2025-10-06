import React, { FC, useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { codelangLogo } from "../../ui";
import "./UserInfoCard.css";
import api from "../../services/baseURL";
import { useNavigate } from "react-router-dom";

interface UserInfoProps {
  id?: string;
}

interface UserData {
  id: string;
  username: string;
  role: string;
}

interface UserStatistic {
  rating?: number;
  snippetsCount?: number;
  commentCount?: number;
  likesCount?: number;
  dislikesCount?: number;
  questionsCount?: number;
  correctAnswerCount?: number;
  regularAnswerCount?: number;
}

const UserInfoCard: FC<UserInfoProps> = ({ id }) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
  const [statistic, setStatistic] = useState<UserStatistic>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = id || userData.id;
        if (!userId) return;

        const response = await api.get(`/users/${userId}/statistic`);
        const stat = response.data?.data?.statistic;
        const userInfo = response.data?.data;

        if (stat) setStatistic(stat);
        if (id && userInfo) {
          setUserData({
            id: userInfo.id,
            username: userInfo.username,
            role: userInfo.role,
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load user statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userData.id]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/me`);
      if (response.data?.data) {
        sessionStorage.removeItem("user");
        navigate("/");
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="userInformation">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <img src={codelangLogo} alt="user icon" />
            <div className="userInfo">
              <b>{userData.username}</b>
              <p> Id: {userData.id}</p>
              <p> Role: {userData.role}</p>
              {!id && (
                <div className="userAccOper">
                  <button id="logoutButton" onClick={handleLogOut}>
                    <LogoutOutlinedIcon />
                  </button>
                  <button id="deleteButton" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <p>Rating: {statistic.rating ?? "-"}</p>
            <p>Snippets: {statistic.snippetsCount ?? 0}</p>
            <p>Comments: {statistic.commentCount ?? 0}</p>
            <p>Likes: {statistic.likesCount ?? 0}</p>
            <p>Dislikes: {statistic.dislikesCount ?? 0}</p>
            <p>Questions: {statistic.questionsCount ?? 0}</p>
            <p>Correct Answer: {statistic.correctAnswerCount ?? 0}</p>
            <p>Regular Answer: {statistic.regularAnswerCount ?? 0}</p>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default UserInfoCard;
