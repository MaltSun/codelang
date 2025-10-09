import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import { MyPostList } from "../../modules/MyPostList";
import { useState } from "react";

const MyPostPage = () => {
  const [refresh, setRefresh] = useState(0);

  const handleOnSuccess = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="mySnippets" />
        <div className="mainPart">
          <h1>Welcome to Codelang!</h1>
          <h1>&lt;/&gt;</h1>
          <MyPostList refresh={refresh} onEdit={handleOnSuccess}/>
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;
