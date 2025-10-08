import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./CreateQuestion.css";
import api from "../../services/baseURL";
import MonacoEditor from "react-monaco-editor";

interface CreateQuestionProps {
  onClose: () => void;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ onClose }) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/questions", {
        title,
        description,
        attachedCode: code,
      });

      if (response.data) {
        alert("Success");
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleSetDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  return (
    <div className="popup-container">
      <form className="popup-body" onSubmit={handleAskQuestion}>
        <div className="popup-header">
          <h2>Ask a question</h2>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseOutlinedIcon style={{ color: "blue" }} />
          </span>
        </div>

        <input
          type="text"
          placeholder="Question title"
          onChange={handleSetTitle}
        />
        <input
          type="text"
          placeholder="Question description"
          onChange={handleSetDescription}
        />

        <p>Attached Code</p>
        <MonacoEditor
          width="100%"
          height="200px"
          language="JavaScript"
          theme="vs"
          className="monacoEditor"
          onChange={setCode}
          value={code}
        />
        <button type="submit">ask question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
