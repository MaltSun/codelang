import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import "./ui/style.css"
import PostPage from "./pages/PostPage/PostPage";


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
]);

container.render(<RouterProvider router={router} />);
