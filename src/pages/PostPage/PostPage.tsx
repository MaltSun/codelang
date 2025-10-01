import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../modules/SideBar";
import { PostCard } from "../../components/PostCard";
import api from "../../services/baseURL";
import CommentCard from "../../components/CommentCard/CommentCard";
import { Pagination } from "@mui/material";
import WriteComment from "../../components/WriteComment/WriteComment";

interface PostData {
  id: number;
  username: string;
  language?: string;
  code?: string;
  likesNumber: number;
  dislikesNumber: number;
  commentsNumber: number;
}

const PostPage: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPost, setPost] = useState<any[]>([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  // const COMMENTS_PER_PAGE = 5;

  const fetchPost = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/api/snippets/${id}`, {
        params: { id: id },
      });

      const { data } = res.data;

      if (Array.isArray(data.comments)) {
        setPost(data.comments);
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

  const location = useLocation();
  const post = location.state as PostData | undefined;

  useEffect(() => {
    fetchPost(post.id);
  }, [fetchPost, post.id]);

  if (!post) {
    return <p>No post data</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="main">
        <SideBar activeItem="home" />
        <div className="mainPart">
          <PostCard
            id={post.id}
            username={post.username}
            likesNumber={post.likesNumber}
            dislikesNumber={post.dislikesNumber}
            commentsNumber={post.commentsNumber}
            language={post.language}
            code={post.code}
          />

          <WriteComment />

          {currentPost.length > 0 ? (
            currentPost.map((comment) => (
              <CommentCard
                key={comment.id}
                id={comment.id}
                content={comment.content}
                username={comment.user?.username || "Anonymous"}
              />
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
