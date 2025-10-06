import api from "../../services/baseURL";
import { UserCard } from "../../components/UserCard";
import React, { useState, useEffect, useCallback } from "react";
import { Pagination } from "../../components/Pagination";

interface User {
  id: number;
  username: string;
  role: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const USERS_PER_PAGE = 10;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/users");
      const data = response.data.data.data;
      setUsers(data);
      setTotalPages(Math.ceil(data.length / USERS_PER_PAGE));
    } catch {
      setError("An error occurred while trying to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNextPageClick = useCallback(() => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const handlePrevPageClick = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const startIndex = (page - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

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

      {currentUsers.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          role={user.role}
        />
      ))}
    </>
  );
};

export default UsersList;
