import React from "react";
import Posts from "../Posts/Posts";
import Post from "../Posts/Post";
import Comments from "../Comments/Comments";
import Comment from "../Comments/Comment";

import moment from "moment";

// libs
import Button from "react-bootstrap/Button";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "./RenderList.scss";

class RenderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  resetStateState = () => {
    this.setState({ startDate: null, endDate: null });
  };

  render() {
    let lastPosts = this.props.renderLastPost();
    if (this.props.lastPost !== "All Time") {
      switch (this.props.lastPost) {
        case "Last 24h":
          if (this.props.currentList === "Stories" || this.props.currentList === 'All') {
            return (
              <React.Fragment>
                {lastPosts.map(post => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    url={post.url}
                    points={post.points}
                    user={post.user}
                    date={post.date}
                    comments={post.comments}
                  />
                ))}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                {lastPosts.map(comment => (
                  <Comment
                    key={comment.id}
                    text={comment.text}
                    points={comment.points}
                    user={comment.user}
                    date={comment.date}
                  />
                ))}
              </React.Fragment>
            );
          }
        case "Past Week":
          if (this.props.currentList === "Stories" || this.props.currentList === 'All') {
            return (
              <React.Fragment>
                {lastPosts.map(post => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    url={post.url}
                    points={post.points}
                    user={post.user}
                    date={post.date}
                    comments={post.comments}
                  />
                ))}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                {lastPosts.map(comment => (
                  <Comment
                    key={comment.id}
                    text={comment.text}
                    points={comment.points}
                    user={comment.user}
                    date={comment.date}
                  />
                ))}
              </React.Fragment>
            );
          }
        case "Past Month":
          if (this.props.currentList === "Stories" || this.props.currentList === 'All') {
            return (
              <React.Fragment>
                {lastPosts.map(post => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    url={post.url}
                    points={post.points}
                    user={post.user}
                    date={post.date}
                    comments={post.comments}
                  />
                ))}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                {lastPosts.map(comment => (
                  <Comment
                    key={comment.id}
                    text={comment.text}
                    points={comment.points}
                    user={comment.user}
                    date={comment.date}
                  />
                ))}
              </React.Fragment>
            );
          };
        case "Past Year":
          if (this.props.currentList === "Stories" || this.props.currentList === 'All') {
            return (
              <React.Fragment>
                {lastPosts.map(post => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    url={post.url}
                    points={post.points}
                    user={post.user}
                    date={post.date}
                    comments={post.comments}
                  />
                ))}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                {lastPosts.map(comment => (
                  <Comment
                    key={comment.id}
                    text={comment.text}
                    points={comment.points}
                    user={comment.user}
                    date={comment.date}
                  />
                ))}
              </React.Fragment>
            );
          }
        case "Custom Range":
          if (this.state.startDate && this.state.endDate) {
            if (this.props.currentList === "Stories" || this.props.currentList === 'All') {
              return this.props.posts.map(post => {
                if (
                  moment(this.state.startDate).format("YYYY-MM-DD") <=
                    post.date &&
                  moment(this.state.endDate).format("YYYY-MM-DD") >= post.date
                ) {
                  return (
                    <React.Fragment>
                      <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        url={post.url}
                        points={post.points}
                        user={post.user}
                        date={post.date}
                        comments={post.comments}
                      />
                      <Button
                        variant="danger"
                        className={"resetStateDateBtn"}
                        onClick={this.resetStateState}
                      >
                        Reset
                      </Button>
                    </React.Fragment>
                  );
                }
                return null;
              });
            } else {
              return this.props.comments.map(comment => {
                if (
                  moment(this.state.startDate).format("YYYY-MM-DD") <=
                    comment.date &&
                  moment(this.state.endDate).format("YYYY-MM-DD") >=
                    comment.date
                ) {
                  return (
                    <React.Fragment>
                      <Comment
                        key={comment.id}
                        text={comment.text}
                        points={comment.points}
                        user={comment.user}
                        date={comment.date}
                      />
                      <Button
                        variant="danger"
                        className={"resetStateDateBtn"}
                        onClick={this.resetStateState}
                      >
                        Reset
                      </Button>
                    </React.Fragment>
                  );
                }
                return null;
              });
            }
          } else {
            return (
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                } // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                isOutsideRange={day =>
                  moment().diff(day) < 0 && moment().diff(day) > 0
                }
              />
            );
          }
        default:
          return <div>Default from render list switch</div>;
      }
    } else {
      switch (this.props.currentList) {
        case "Stories":
          return (
            <React.Fragment>
              <Posts
                posts={this.props.posts}
                searchTerm={this.props.searchTerm}
                currentBy={this.props.currentBy}
              />
            </React.Fragment>
          );
        case "Comments":
          return (
            <React.Fragment>
              <Comments
                comments={this.props.comments}
                searchTerm={this.props.searchTerm}
                currentBy={this.props.currentBy}
              />
            </React.Fragment>
          );
        default:
          return (
            <React.Fragment>
              <Posts
                posts={this.props.posts}
                searchTerm={this.props.searchTerm}
                currentBy={this.props.currentBy}
              />
              <Comments
                comments={this.props.comments}
                searchTerm={this.props.searchTerm}
                currentBy={this.props.currentBy}
              />
            </React.Fragment>
          );
      }
    }
  }
}

export default RenderList;
