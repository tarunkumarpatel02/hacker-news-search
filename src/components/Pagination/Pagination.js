import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Pagination.scss";

const renderPagination = props => {
  let items = [];
  let odd = Math.ceil(props.totalPosts / props.hitsPerPage);
  odd = odd % 2 ? odd -1 : odd;

  for (let i = 1; i <= odd; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={props.currentPage === i}
        onClick={() => props.paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return <Pagination className="Pagination">{items}</Pagination>;
};

export default renderPagination;
