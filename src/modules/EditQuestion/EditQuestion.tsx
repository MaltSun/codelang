import api from "@/services/baseURL";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MonacoEditor from "react-monaco-editor";
import { useTranslation } from "react-i18next";

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

const EditQuestion: React.FC<QuestionCardProps> = ({
  id,
  title,
  description,
  onClose,
  onSuccess,
}) => {
  const [attachedCode, setAttachedCode] = useState("");
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/questions/${id}`, {
        title: newTitle,
        description: newDescription,
        attachedCode,
      });

      if (response.data) {
        alert("Success");
        onClose();
        onSuccess();
        setError("");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleSetDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  return (
    <div className="popup-container">
      <form className="popup-body" onSubmit={handleEditPost}>
        <div className="popup-header">
          <h2>{t("edit_question")}</h2>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseOutlinedIcon style={{ color: "blue" }} />
          </span>
        </div>

        <input
          type="text"
          placeholder="Question title"
          onChange={handleSetTitle}
          value={newTitle}
        />
        <input
          type="text"
          placeholder="Question description"
          onChange={handleSetDescription}
          value={newDescription}
        />

        <p>{t("attach_code")}</p>
        <MonacoEditor
          width="100%"
          height="200px"
          language="JavaScript"
          theme="vs"
          className="monacoEditor"
          onChange={setAttachedCode}
          value={attachedCode}
        />
        <button type="submit">{t("save")}</button>
        {isLoading && <p>{t("loading")}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
export default EditQuestion;
