import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import { MyPostList } from "../../modules/MyPostList";

const MyPostPage = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="mySnippets" />
        <div className="mainPart">
          <h1>Welcome to Codelang!</h1>
          <h1>&lt;/&gt;</h1>
          <MyPostList />
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;
