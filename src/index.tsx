import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import "./ui/style.css";
import PostPage from "./pages/PostPage/PostPage";
import { CreatePostPage } from "./pages/SnippetPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UsersPage } from "./pages/UsersPage";
import { AccountPage } from "./pages/AccountPage";
import { MyPostPage } from "./pages/MyPostPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/post",
    element: <PostPage />,
  },
  {
    path: "/snippet",
    element: <CreatePostPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reg",
    element: <RegisterPage />,
  },
   {
    path: "/users",
    element: <UsersPage />,
  },
   {
    path: "/account",
    element: <AccountPage />,
  },
   {
    path: "/myPost",
    element: <MyPostPage/>,
  },
  {
    path: "*",
    element: <h1>Something gone wrong :() </h1>,
  },
]);

container.render(<RouterProvider router={router} />);
