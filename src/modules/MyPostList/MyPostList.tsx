import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/baseURL";
import { PostCard } from "../../components/PostCard";
import { Pagination } from "../../components/Pagination";
import { EditPost } from "../EditPost";

interface MyPostListProps {
  onClick?: () => void;
}

const MyPostList: React.FC<MyPostListProps> = ({ onClick }) => {
  
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = JSON.parse(sessionStorage.getItem("user")).id;

  const fetchPosts = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/snippets`, {
        params: {
          userId,
          page,
          sortBy: ["id:DESC"],
        },
      });

      const { data, meta } = res.data.data;

      if (Array.isArray(data)) {
        setPosts(data);
        setTotalPages(meta.totalPages);
        setPosts(normalizePosts(data));
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
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.user?.username || "Unknown User"}
            language={post.language || "JavaScript"}
            code={post.code || "// write your code"}
            commentsNumber={post.commentsNumber}
            likesNumber={post.likesNumber}
            dislikesNumber={post.dislikesNumber}
            canEdit={true}
            openEdit={onClick}
          />
        ))
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default MyPostList;
