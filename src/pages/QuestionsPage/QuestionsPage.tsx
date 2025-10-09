import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { Suspense, useState, lazy } from "react";
const QuestionList = lazy(() => import("@/modules/QuestionList/QuestionList"));
const CreateQuestion = lazy(
  () => import("@/modules/CreateQuestion/CreateQuestion")
);

const QuestionsPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0); 

  const handleOpenQuestion = () => setOpen(true);
  const handleCloseQuestion = () => setOpen(false);

  const handleOnSuccess = () => {
    setRefresh(prev => prev + 1); 
    handleCloseQuestion(); 
  };

  return (
    <div>
      <Header askQuestion={true} onClick={handleOpenQuestion} />
      <div className="main">
        <SideBar activeItem="questions" />
        <div className="mainPart">
          {isOpen && (
            <Suspense fallback={<p>Loading...</p>}>
              <CreateQuestion onClose={handleCloseQuestion} onSuccess={handleOnSuccess} />
            </Suspense>
          )}

          <Suspense fallback={<p>Loading questions...</p>}>
            <QuestionList refresh={refresh} onEdit={handleOnSuccess}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
