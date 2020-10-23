import React from "react";

const Comment = props => {
  return (
    <div className="Comment">
      <div className="d-flex header">
        <h5 dangerouslySetInnerHTML={{ __html: props.text }}></h5>
      </div>
      <div className="d-flex stats">
        <span>{props.user}</span>
        <span>{props.date}</span>
      </div>
    </div>
  );
};

export default Comment;