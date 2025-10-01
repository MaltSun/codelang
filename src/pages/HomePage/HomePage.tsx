import React from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { SideBar } from "../../modules/SideBar";
import PostCardList from "../../modules/PostCardList/PostCardList";

const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <div className="main">
        <SideBar activeItem="home" />
        <div className="mainPart">
          <h1>Welcome to Codelang!</h1>
          <h1>&lt;/&gt;</h1>

          <PostCardList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
