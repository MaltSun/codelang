import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import api from "@/services/baseURL";
import "./EditPost.css";

interface EditPostProps {
  onClose: () => void;
  id: number;
  lang: string;
  code: string
}

const EditPost: React.FC<EditPostProps> = ({ onClose, id, lang, code}) => {
  const [newCode, setCode] = useState(code);
  const [language, setLanguage] = useState(lang);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/snippets/${id}`, {
        code: newCode,
        language,
      });

      if (response.data) {
        alert("Success");
        onClose();
        setError("");
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
    <div className="popup-container">
      <form className="popup-body" onSubmit={handleEditPost}>
        <div className="popup-header">
          <h2>Edit snippet</h2>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseOutlinedIcon style={{ color: "blue" }} />
          </span>
        </div>

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

        <p>Edite Code</p>
        <MonacoEditor
          width="100%"
          height="200px"
          language="JavaScript"
          theme="vs"
          className="monacoEditor"
          onChange={setCode}
          value={newCode}
        />
        <button type="submit">save</button>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default EditPost;
