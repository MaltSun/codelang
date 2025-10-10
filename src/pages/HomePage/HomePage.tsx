import React, { Suspense, lazy } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { SideBar } from "@/modules/SideBar";
import { useTranslation } from "react-i18next";

const PostCardList = lazy(() => import("@/modules/PostCardList/PostCardList"));

const HomePage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="homePage">
      <Header />
      <div className="main">
        <SideBar activeItem="home" />

        <div className="mainPart">
          <h1>{t("welc_codelang")}</h1>
          <h1>&lt;/&gt;</h1>

          <Suspense fallback={<div>{t("loading")}</div>}>
            <PostCardList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
