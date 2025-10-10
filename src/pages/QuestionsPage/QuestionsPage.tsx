import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { Suspense, useState, lazy } from "react";
import { useTranslation } from "react-i18next";
const QuestionList = lazy(() => import("@/modules/QuestionList/QuestionList"));
const CreateQuestion = lazy(
  () => import("@/modules/CreateQuestion/CreateQuestion")
);

const QuestionsPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const { t, i18n } = useTranslation();

  const handleOpenQuestion = () => setOpen(true);
  const handleCloseQuestion = () => setOpen(false);

  const handleOnSuccess = () => {
    setRefresh((prev) => prev + 1);
    handleCloseQuestion();
  };

  return (
    <div>
      <Header askQuestion={true} onClick={handleOpenQuestion} />
      <div className="main">
        <SideBar activeItem="questions" />
        <div className="mainPart">
          {isOpen && (
            <Suspense fallback={<p>{t("loading")}</p>}>
              <CreateQuestion
                onClose={handleCloseQuestion}
                onSuccess={handleOnSuccess}
              />
            </Suspense>
          )}

          <Suspense fallback={<p>{t("loading")}</p>}>
            <QuestionList refresh={refresh} onEdit={handleOnSuccess} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
