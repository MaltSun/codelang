import React, { Suspense, lazy } from "react";
import "./UsersPage.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../modules/SideBar";
const UsersList = lazy(()=>import("@/modules/UsersList/UsersList"));

const UsersPage = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="users" />
        <div className="mainPart ">
          <Suspense>
            <UsersList />
          </Suspense>
          
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
