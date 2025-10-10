import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./ui/style.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const container = createRoot(root);

const Router = router;

container.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
