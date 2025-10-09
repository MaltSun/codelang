import React, { lazy, Suspense, useState } from "react";
import "./AccountPage.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../modules/SideBar";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";

const  ChangeUsername = lazy(()=> import( "@/modules/ChangeUsername/ChangeUsername"));
const ChangePassword = lazy(()=> import("@/modules/ChangePassword/ChangePassword")) ;

const AccountPage = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
    const [refresh, setRefresh] = useState(0); 
  
    const handleOnSuccess = () => {
      setRefresh(prev => prev + 1); 
    };
  

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="account" />
        <div className="mainPart">
          <h1>Welcome, {user.username}</h1>
          <UserInfoCard refresh={refresh}/>
          <div className="changeBlock">
            <p>Edit your profile:</p>
            <div>
              <Suspense>
                <ChangeUsername onSubmit={handleOnSuccess}/>
              </Suspense>
              <Suspense>
                <ChangePassword onSubmit={handleOnSuccess}/>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
