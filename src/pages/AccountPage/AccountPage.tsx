import React, { useState } from "react";
import "./AccountPage.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../modules/SideBar";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { ChangeUsername } from "../../modules/ChangeUsername";
import ChangePassword from "../../modules/ChangePassword/ChangePassword";

const AccountPage = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  ); 
return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="account" />
        <div className="mainPart">
          <h1>Welcome, {user.username}</h1>
          <UserInfoCard />
          <div className="changeBlock">
            <p>Edit your profile:</p>
            <div>
              <ChangeUsername />
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

