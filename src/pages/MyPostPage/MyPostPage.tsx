import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import { MyPostList } from "../../modules/MyPostList";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MyPostPage = () => {
  const [refresh, setRefresh] = useState(0);
    const { t, i18n } = useTranslation();

  const handleOnSuccess = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="mySnippets" />
        <div className="mainPart">
          <h1>{t("welc_codelang")}</h1>
          <h1>&lt;/&gt;</h1>
          <MyPostList refresh={refresh} onEdit={handleOnSuccess}/>
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;
