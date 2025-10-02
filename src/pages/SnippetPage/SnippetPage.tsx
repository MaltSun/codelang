import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { useCallback, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useLocation } from "react-router-dom";
import api from "../../services/baseURL";
import "./SnippetPage.css";
const CreatePostPage = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="snippets" />
        <div className="mainPart snippets">
          <h1>Create new snippet!</h1>
          <div className="chooseLanguage">
            <p>
              <b>Language of your shippet:</b>
            </p>
            <label htmlFor="">Select</label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              name="choooseLanguage"
              id=""
            >
              <option value="JavaScript">JavaScript</option>
              <option value="C#">C#</option>
            </select>
          </div>

          <div className="writeSnippet">
            <p>
              <b>Code of your snippet:</b>
            </p>
            <div style={{ border: "2px solid var(--accent-color)" }}>
              <MonacoEditor
                width="100%"
                height="250px"
                language={language}
                theme="vs"
                className="monacoEditor"
              />
            </div>
          </div>

          <button id="createSnippet">create snippet</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
