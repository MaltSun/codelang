import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React from "react";
import { QuestionList } from "@/modules/QuestionList";

const QuestionsPage = () => {
  return (
    <div>
      <Header askQuestion={true} />
      <div className="main">
        <SideBar activeItem="questions" />
        <div className="mainPart">
          <QuestionList />
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
