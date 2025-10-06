import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute requireAuth>
        <AccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reg",
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post",
    element: (
      <ProtectedRoute requireAuth>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/snippet",
    element: (
      <ProtectedRoute requireAuth>
        <CreatePostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/myPost",
    element: (
      <ProtectedRoute requireAuth>
        <MyPostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/question",
    element: <QuestionsPage />,
  },
  {
    path: "/user/:id",
    element: <UserProfilePage />,
  },
  {
    path: "*",
    element: <h1>Something gone wrong :() </h1>,
  },
]);

container.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
