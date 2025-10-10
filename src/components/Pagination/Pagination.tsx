import React from "react";
import "./Pagination.css";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = React.memo((props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;
 
  return (
    <div className="pagination">
      <button
        type="button"
        onClick={onPrevPageClick}
        disabled={disable.left}
      >
        {"<"}
      </button>
      {nav && <span>{nav.current}</span>}
      <button
        type="button"
        onClick={ onNextPageClick}
        disabled={disable.right}
      >
        {">"}
      </button>
    </div>
  );
});

export default React.memo(Pagination);
