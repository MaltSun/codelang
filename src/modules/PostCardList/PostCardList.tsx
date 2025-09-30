import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/baseURL";
import { PostCard } from "../../components/PostCard";
import { Pagination } from "../../components/Pagination";

const PostCardList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/snippets`)
      .then((res) => {
        console.log("API response:", res.data);

        if (Array.isArray(res.data.data.data)) {
          setPosts(res.data.data.data);
          setTotalPages(res.data.data.meta.totalPages);
          const ROWS_PER_PAGE = res.data.data.meta.itemsPerPage;
        } else {
          console.error("Unexpected API response format:", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading posts");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const countLikesOrDislikes = (
    post: any,
    type: "like" | "dislike"
  ): number => {
    if (!post.marks) return 0;
    return post.marks.filter((mark: any) => mark.type === type).length;
  };

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
            commentsNumber={post.comments?.length || 0}
            likesNumber={countLikesOrDislikes(post, "like")}
            dislikesNumber={countLikesOrDislikes(post, "dislike")}
          />
        ))
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default PostCardList;
