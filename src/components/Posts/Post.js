import React from "react";
import './Posts.scss';
import { Link } from "react-router-dom";

const Post = ({id, title, url, points, user, date, comments}) => {
  return (
    <div className="Post">
      <div className="d-flex header">
        <Link
          to={{
            pathname: `/post/${id}`,
            details: { 
              title,
              url,
              points,
              user,
              date,
              comments
            }
          }} >
          <h4>{title}</h4>
          {url ? <span className="truncate">({url})</span> : null}
        </Link>
      </div>
      <div className="d-flex stats">
        <span>{points} points</span>
        <span>{user}</span>
        <span>{date}</span>
        {comments ? <span>{comments.length}</span> : null}
      </div>
    </div>
  );
};

export default Post;
