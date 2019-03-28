import React from "react";
import "../styles/Pagination.css";

const Pagination = props => {
  return (
    <div className="pagination">
      <button className="pagination__prev" onClick={props.clickPrev}>
        prev
      </button>
      <button className="pagination__next" onClick={props.clickNext}>
        next
      </button>
    </div>
  );
};

export default Pagination;
