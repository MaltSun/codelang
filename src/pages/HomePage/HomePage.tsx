import React, { Suspense, lazy } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
// import { SideBar } from "@/modules/SideBar";

const SideBar = lazy(() => import("@/modules/SideBar/SideBar"));
const PostCardList = lazy(() => import("@/modules/PostCardList/PostCardList"));

const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <div className="main">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <SideBar activeItem="home" />
        </Suspense>

        <div className="mainPart">
          <h1>Welcome to Codelang!</h1>
          <h1>&lt;/&gt;</h1>

          <Suspense fallback={<div>Loading posts...</div>}>
            <PostCardList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
