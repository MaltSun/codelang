import React from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { SideBar } from "../../modules/SideBar";

const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <SideBar />
    </div>
  );
};

export default HomePage;
