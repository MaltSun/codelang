import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { Suspense, useState, lazy } from "react";
const QuestionList = lazy(() => import("@/modules/QuestionList/QuestionList"));
const CreateQuestion = lazy(
  () => import("@/modules/CreateQuestion/CreateQuestion")
);

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
          {isOpen && (
            <Suspense>
              <CreateQuestion onClose={handleCloseQuestion} />
            </Suspense>
          )}
          <Suspense>
            <QuestionList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
