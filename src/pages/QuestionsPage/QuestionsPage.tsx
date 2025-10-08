import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { useState } from "react";
import { QuestionList } from "@/modules/QuestionList";
import { CreateQuestion } from "@/modules/CreateQuestion";

const QuestionsPage = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenQuestion = () => {
    setOpen(true);
  };

  const handleCloseQuestion = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header askQuestion={true} onClick={handleOpenQuestion} />
      <div className="main">
        <SideBar activeItem="questions" />
        <div className="mainPart">
          {isOpen && <CreateQuestion onClose={handleCloseQuestion} />}
          <QuestionList />
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
