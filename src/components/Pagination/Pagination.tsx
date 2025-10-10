import React from "react";
import "./Pagination.css";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  current: number;
  totalPages: number;
};

const Pagination = React.memo((props: PaginationProps) => {
  const { current, totalPages, onNextPageClick, onPrevPageClick } = props;

  const handleDisable = () => {
    return current === 1 ? "next" : current === totalPages ? "prev" : null;
  };

  return (
    <div className="pagination">
      {handleDisable() === "next" ? (
        <button onClick={onPrevPageClick} disabled>
          {"<"}
        </button>
      ) : (
        <button onClick={onPrevPageClick}>{"<"}</button>
      )}

      {current && <span>{current}</span>}
      {handleDisable() === "prev" ? (
        <button onClick={onNextPageClick} disabled>
          {">"}
        </button>
      ) : (
        <button onClick={onNextPageClick}>{">"}</button>
      )}
    </div>
  );
});

export default React.memo(Pagination);
