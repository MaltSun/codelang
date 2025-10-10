import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./ui/style.css";
import i18n from "./ui/i18n";

const storedLang = sessionStorage.getItem("lang") || "en";
i18n.changeLanguage(storedLang);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const container = createRoot(root);

container.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
