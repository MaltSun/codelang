import React, { Suspense, useCallback, useEffect, useState, lazy } from "react";
import api from "../../services/baseURL";
import { PostCard } from "../../components/PostCard";
import { Pagination } from "../../components/Pagination";

const PostCardList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user.id;

  const fetchPosts = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/snippets`, {
          params: { page, sortBy: ["id:DESC"] },
        });

        const { data, meta } = res.data.data;

        if (Array.isArray(data)) {
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
    },
    [userId]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const normalizePosts = (posts: any[]) =>
    posts.map((post) => {
      const likes =
        post.marks?.filter((m: any) => m.type === "like").length ?? 0;
      const dislikes =
        post.marks?.filter((m: any) => m.type === "dislike").length ?? 0;
      const comments = post.comments?.length ?? 0;
      const userMark =
        post.marks?.find((m: any) => m.user.id === userId)?.type ?? null;

      return {
        ...post,
        likesNumber: likes,
        dislikesNumber: dislikes,
        commentsNumber: comments,
        mark: userMark,
      };
    });

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
        current={page}
        totalPages={totalPages}
      />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Suspense>
            <PostCard
              key={post.id}
              id={post.id}
              username={post.user?.username || "Unknown User"}
              language={post.language || "JavaScript"}
              code={post.code || "// write your code"}
              commentsNumber={post.commentsNumber}
              likesNumber={post.likesNumber}
              dislikesNumber={post.dislikesNumber}
              mark={post.mark}
            />
          </Suspense>
        ))
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default PostCardList;
