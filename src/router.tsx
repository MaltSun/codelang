import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";

import { HomePage } from "./pages/HomePage";
import PostPage from "./pages/PostPage/PostPage";
import { CreatePostPage } from "./pages/SnippetPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UsersPage } from "./pages/UsersPage";
import { AccountPage } from "./pages/AccountPage";
import { MyPostPage } from "./pages/MyPostPage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { UserProfilePage } from "./pages/UserProfilePage";

export enum AppRoutes {
  HOME = "/",
  ACCOUNT = "/account",
  SNIPPET = "/snippet",
  MY_SNIPPETS = "/myPost",
  QUESTIONS = "/question",
  USERS = "/users",
  LOGIN = "/login",
  REG = "/reg",
  POST = "/post",
  USER_ACC= "/user/:id"
}

const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <HomePage />,
  },
  {
    path: AppRoutes.ACCOUNT,
    element: (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.LOGIN,
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.REG,
    element: (
      <ProtectedRoute>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.POST,
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.SNIPPET,
    element: (
      <ProtectedRoute>
        <CreatePostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.USERS,
    element: <UsersPage />,
  },
  {
    path: AppRoutes.MY_SNIPPETS,
    element: (
      <ProtectedRoute>
        <MyPostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.QUESTIONS,
    element: <QuestionsPage />,
  },
  {
    path: AppRoutes.USER_ACC,
    element: <UserProfilePage />,
  },
  {
    path: "*",
    element: <h1>Something went wrong</h1>,
  },
]);

export default router;
