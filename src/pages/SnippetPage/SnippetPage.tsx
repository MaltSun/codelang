import { SideBar } from "../../modules/SideBar";
import { Header } from "../../components/Header";
import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "./SnippetPage.css";
import api from "../../services/baseURL";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router";

const CreatePostPage = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleWriteComment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/snippets", { code, language });
      const createdSnippet = response.data;

      if (createdSnippet) {
        alert("Snippet created successfully!");
        setCode("");
        setError("");
        navigate(AppRoutes.MY_SNIPPETS)
      } else {
        setError("Snippet wasn't created");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const getLanguage = async () => {
    try {
      const response = await api.get("/snippets/languages");
      const snippetLanguage = response.data;

      if (snippetLanguage && Array.isArray(snippetLanguage.data)) {
        setLanguages(snippetLanguage.data);
      
      } else {
        setError("Invalid language data received");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const handleSetLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="snippets" />
        <div className="mainPart snippets">
          <h1>Create new snippet!</h1>
          <div className="chooseLanguage">
            <p>
              <b>Language of your snippet:</b>
            </p>
            <label htmlFor="">Select</label>
            <select
              value={language}
              onChange={handleSetLanguage}
              name="chooseLanguage"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
              
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
                onChange={setCode}
              />
            </div>
          </div>

          {isLoading ? (
            <button id="createSnippet">Loading...</button>
          ) : (
            <button id="createSnippet" onClick={handleWriteComment}>
              Create snippet
            </button>
          )}

          {error && <h1>{error}</h1>}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
