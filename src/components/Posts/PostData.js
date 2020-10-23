import React from "react";
import { getStoryComments } from "../../api/api";
import Comment from '../Comments/Comment';

import moment from "moment";

class PostData extends React.Component {
  state = {
    comments: [
      {
        user: '',
        id: '',
        parent: '',
        text: '',
        time: ''
      }
    ]
  };

  componentDidMount() {
    getStoryComments(this.props.match.params.id).then(res => {
      res.map(comment => {
        this.setState(prevState => ({
          comments: [
            ...prevState.comments,
            {
              user: comment.by,
              id: comment.id,
              parent: comment.parent,
              text: comment.text,
              date: moment.unix(comment.time).format("YYYY-MM-DD")
            }
          ],
        }));
        return null;
      });
    });
    if (!this.state.comments[0].length) {
      this.state.comments.splice(0, 1);
    }
  }

  render() {
    const {
      title,
      url,
      points,
      user,
      date,
      comments
    } = this.props.location.details;

    return (
      <React.Fragment>
        <div className="Post">
          <div className="d-flex header">
            <h4>{title}</h4>
            <a href={url} className="truncate">
              <span>({url})</span>
            </a>
          </div>
          <div className="d-flex stats">
            <span>{points} points</span>
            <span>{user}</span>
            <span>{date}</span>
            {comments ? <span>{comments.length} comments</span> : null}
          </div>
        </div>
        <div>
          {
          this.state.comments.map(comment => {
            return (
              <Comment
                key={comment.id}
                text={comment.text}
                user={comment.user}
                date={comment.date}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PostData;
