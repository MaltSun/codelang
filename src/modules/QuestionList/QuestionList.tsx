import api from "../../services/baseURL";
import Pagination from "../../components/Pagination/Pagination";
import React, { useCallback, useEffect, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";

const QuestionList = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/questions`, {
        params: {
          page,
          limit: 5,
          sortBy: ["id:DESC"],
        },
      });

      const { data, meta } = res.data.data;

      if (Array.isArray(data)) {
        setQuestions(data);
        setTotalPages(meta.totalPages);
        setQuestions(normalizePosts(data));
      } else {
        console.error("Unexpected API response format:", res.data);
        setError("Invalid response format");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const normalizePosts = (posts: any[]) =>
    posts.map((post) => ({
      ...post,
      likesNumber:
        post.marks?.filter((m: any) => m.type === "like").length ?? 0,
      dislikesNumber:
        post.marks?.filter((m: any) => m.type === "dislike").length ?? 0,
      commentsNumber: post.comments?.length ?? 0,
    }));

  const handleNextPageClick = useCallback(() => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const handlePrevPageClick = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Pagination
        onNextPageClick={handleNextPageClick}
        onPrevPageClick={handlePrevPageClick}
        disable={{
          left: page === 1,
          right: page === totalPages,
        }}
        nav={{ current: page, total: totalPages }}
      />
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCard
            id={question.id}
            title={question.title}
            description={question.description}
            username={question.user.username}
          />
        ))
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default QuestionList;
