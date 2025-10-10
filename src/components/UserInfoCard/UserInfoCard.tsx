import React, { FC, useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { codelangLogo } from "../../ui";
import "./UserInfoCard.css";
import api from "../../services/baseURL";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router";
import { useTranslation } from "react-i18next";

interface UserInfoProps {
  id?: string;
  refresh?: number;
}

interface UserData {
  id: string;
  username: string;
  role: string;
}

interface UserStatistic {
  rating: number;
  snippetsCount: number;
  commentCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswerCount: number;
  regularAnswerCount: number;
}

const UserInfoCard: FC<UserInfoProps> = ({ id, refresh }) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
  const [statistic, setStatistic] = useState<UserStatistic>({
    rating: 0,
    snippetsCount: 0,
    commentCount: 0,
    likesCount: 0,
    dislikesCount: 0,
    questionsCount: 0,
    correctAnswerCount: 0,
    regularAnswerCount: 0,
  });
   const { t, i18n } = useTranslation();
    
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

        if (stat) {
          setStatistic({
            rating: stat.rating ?? 0,
            snippetsCount: stat.snippetsCount ?? 0,
            commentCount: stat.commentCount ?? 0,
            likesCount: stat.likesCount ?? 0,
            dislikesCount: stat.dislikesCount ?? 0,
            questionsCount: stat.questionsCount ?? 0,
            correctAnswerCount: stat.correctAnswerCount ?? 0,
            regularAnswerCount: stat.regularAnswerCount ?? 0,
          });
        }

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
  }, [id, userData.id, refresh]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/me`);
      if (response.data?.data) {
        sessionStorage.removeItem("user");
        navigate(AppRoutes.HOME);
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
    navigate(AppRoutes.HOME);
  };

  return (
    <div className="userInformation">
      {isLoading ? (
        <h1>{t("loading")}</h1>
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
          <p>{t("rating")}: {statistic.rating}</p>
            <p>{t("snippets")}: {statistic.snippetsCount}</p>
            <p>{t("comments")}: {statistic.commentCount}</p>
            <p>{t("likes")}: {statistic.likesCount}</p>
            <p>{t("dislikes")}: {statistic.dislikesCount}</p>
            <p>{t("questions")}: {statistic.questionsCount}</p>
            <p>{t("corr_answer")}: {statistic.correctAnswerCount}</p>
            <p>{t("reg_answer")}: {statistic.regularAnswerCount}</p>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default UserInfoCard;
