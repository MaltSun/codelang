import React from "react";
import "./UsersPage.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../modules/SideBar";
import UsersList from "../../modules/UsersList/UsersList";

const UsersPage = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="users" />
        <div className="mainPart ">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
