import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React from "react";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header />
      <div className="main">
        <SideBar activeItem="account" />
        <div className="mainPart">
          <UserInfoCard id={id} />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
