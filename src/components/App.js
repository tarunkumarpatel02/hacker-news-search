import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Settings from "./Pages/Settings/Settings";
import PostData from "./Posts/PostData";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.scss";

import Navcustom from "./Navbar/Navbar";
import Loader from "./Spinner/Loader";
import Footer from "./Footer/Footer";
import DropdownBtn from "./DropdownBtn/DropdownBtn";
import RenderList from "./RenderList/RenderList";
import Pagination from "./Pagination/Pagination";

// Libraries
import moment from "moment";

// Api
import { getTopStories, getComments } from "../api/api";

class App extends React.Component {
  state = {
    posts: [
      {
        user: null,
        id: null,
        date: null,
        title: null,
        type: null,
        url: null,
        points: null,
        comments: null
      }
    ],
    comments: [
      {
        user: null,
        id: null,
        parent: null,
        text: null,
        time: null
      }
    ],
    searchTerm: "",
    isLoading: false,
    searchTopic: ["All", "Stories", "Comments"],
    searchBy: ["Popularity", "Date"],
    searchFor: [
      "All Time",
      "Last 24h",
      "Past Week",
      "Past Month",
      "Past Year",
      "Custom Range"
    ],
    currentList: "Stories",
    currentBy: "Popularity",
    lastPost: "All Time",
    currentPage: 1,
    hitsPerPage: 10
  };

  getStoryIds = async () => {
    return await getTopStories().then(res => {
      const response = res.map(s => s);
      return response;
    });
  };

  setStories = () => {
    this.getStoryIds().then(res => {
      res.map(story => {
        this.setState(prevState => ({
          posts: [
            ...prevState.posts,
            {
              user: story.by,
              id: story.id,
              date: moment.unix(story.time).format("YYYY-MM-DD"),
              title: story.title,
              type: story.type,
              url: story.url,
              points: story.score,
              comments: story.kids
            }
          ],
        }));
        return null;
      });
    }).catch(error => console.log(error));
    if (!this.state.posts[0].length) {
      this.state.posts.splice(0, 1);
    }
  };

  getCommentsIds = async () => {
    return await getComments().then(res => {
      const response = res.map(c => c);
      return response;
    });
  };

  setComments = () => {
    this.getCommentsIds().then(res => {
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
          isLoading: false
        }));
        return null;
      });
    }).catch(error => console.log(error));
    if (!this.state.comments[0].length) {
      this.state.comments.splice(0, 1);
    }
  };

  componentDidMount() {
    this.setStories();
    this.setComments();
  }
  
  componentDidUpdate(prevState) {
    if (this.state.posts !== prevState.posts) {
      return null;
    } else {
      this.setStories();
      this.setComments();
    }
  }

  onKeyUp = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  setCurrentList = e => {
    this.setState({
      currentList: e.target.text,
      currentPage: 1
    });
  };

  setCurrentBy = async e => {
    await this.setState({
      currentBy: e.target.text
    });
    await this.orderBy();
  };

  setLastPost = async e => {
    await this.setState({
      lastPost: e.target.text
    });
    await this.renderLastPosts();
  };

  orderBy = () => {
    // Honestly i have no ideea why i have to pass Date at the points and popularity on sort by date.
    // But hey, it's working 🤷🏿‍♂️
    if (this.state.currentBy === "Date") {
      this.setState({
        posts: this.state.posts.sort(
          (a, b) =>
            new Date(...b.date.split("/").reverse()) -
            new Date(...a.date.split("/").reverse())
        ),
        comments: this.state.comments.sort(
          (a, b) =>
            new Date(...b.date.split("/").reverse()) -
            new Date(...a.date.split("/").reverse())
        )
      });
    }

    if (this.state.currentBy === "Popularity") {
      this.setState({
        posts: this.state.posts.sort((a, b) => (a.points < b.points ? 1 : -1)),
        comments: this.state.comments.sort((a, b) =>
          a.points > b.points ? -1 : 1
        )
      });
    }
  };

  renderLastPosts = () => {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.hitsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    // Get current comments
    const indexOfLastComment = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstComment = indexOfLastComment - this.state.hitsPerPage;
    const currentComments = this.state.comments.slice(
      indexOfFirstComment,
      indexOfLastComment
    );

    if (this.state.currentList === "Stories") {
      switch (this.state.lastPost) {
        case "Last 24h":
          let postFilteredOneDay = currentPosts.filter(post => {
            const lastDay = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            return lastDay <= post.date;
          });
          return postFilteredOneDay;
        case "Past Week":
          let postFilteredWeek = currentPosts.filter(post => {
            const lastWeek = moment()
              .subtract(1, "weeks")
              .endOf("week")
              .format("YYYY-MM-DD");
            return lastWeek <= post.date;
          });
          return postFilteredWeek;
        case "Past Month":
          let postFilteredMonth = currentPosts.filter(post => {
            const lastMonth = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            return lastMonth <= post.date;
          });
          return postFilteredMonth;
        case "Past Year":
          let postFilteredYear = currentPosts.filter(post => {
            const lastYear = moment()
              .subtract(1, "years")
              .endOf("year")
              .format("YYYY-MM-DD");
            return lastYear <= post.date;
          });
          return postFilteredYear;
        case "Custom Range":
          break;
        default:
          return <div>Default state</div>;
      }
    } else if (this.state.currentList === "Comments") {
      switch (this.state.lastPost) {
        case "Last 24h":
          let commentFilteredOneDay = currentComments.filter(comment => {
            const lastDay = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            return lastDay <= comment.date;
          });
          return commentFilteredOneDay;
        case "Past Week":
          let commentFilteredWeek = currentComments.filter(comment => {
            const lastWeek = moment()
              .subtract(1, "weeks")
              .endOf("week")
              .format("YYYY-MM-DD");
            return lastWeek <= comment.date;
          });
          return commentFilteredWeek;
        case "Past Month":
          let commentFilteredMonth = currentComments.filter(comment => {
            const lastMonth = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            return lastMonth <= comment.date;
          });
          return commentFilteredMonth;
        case "Past Year":
          let commentFilteredYear = currentComments.filter(comment => {
            const lastYear = moment()
              .subtract(1, "years")
              .endOf("year")
              .format("YYYY-MM-DD");
            return lastYear <= comment.date;
          });
          return commentFilteredYear;
        case "Custom Range":
          break;
        default:
          return <div>Default state</div>;
      }
    } else {
      switch (this.state.lastPost) {
        case "Last 24h":
          let postFilteredOneDay = currentPosts.filter(post => {
            const lastDay = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            return lastDay <= post.date;
          });
          return postFilteredOneDay;
        case "Past Week":
          let postFilteredWeek = currentPosts.filter(post => {
            const lastWeek = moment()
              .subtract(1, "weeks")
              .endOf("week")
              .format("YYYY-MM-DD");
            return lastWeek <= post.date;
          });
          return postFilteredWeek;
        case "Past Month":
          let postFilteredMonth = currentPosts.filter(post => {
            const lastMonth = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            return lastMonth <= post.date;
          });
          return postFilteredMonth;
        case "Past Year":
          let postFilteredYear = currentPosts.filter(post => {
            const lastYear = moment()
              .subtract(1, "years")
              .endOf("year")
              .format("YYYY-MM-DD");
            return lastYear <= post.date;
          });
          return postFilteredYear;
        case "Custom Range":
          break;
        default:
          return <div>Default state</div>;
      }
    }
  };

  setCurrentPage = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  paginate = pageNumber => {
    this.setCurrentPage(pageNumber);
  };

  renderDomLoadingTime() {
    let startTime = window.performance.now();
    let endTime = window.performance.now();
    let time = endTime - startTime;
    return time.toFixed(3);
  }

  renderResultsNumber = () => {
    switch (this.state.currentList) {
      case "All":
        return this.state.posts.length + this.state.comments.length;
      case "Stories":
        return this.state.posts.length;
      case "Comments":
        return this.state.comments.length;
      default:
        return null;
    }
  };

  // basically it's repetive code because on settings page i have option/select
  // and the e.target.text don't work, it's needed value.

  hanldeChangeHitsPerPage = e => {
    this.setState({ hitsPerPage: parseInt(e.target.value) });
  };

  hanldeChangeCurrentList = e => {
    this.setState({ currentList: e.target.value });
  };

  handleChangeCurrentBy = e => {
    this.setState({
      currentBy: e.target.value
    });
    this.orderBy();
  };

  handleChangeLastPost = async e => {
    await this.setState({ lastPost: e.target.value });
    await this.renderLastPosts();
  };

  render() {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.hitsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    // Get current comments
    const indexOfLastComment = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstComment = indexOfLastComment - this.state.hitsPerPage;
    const currentComments = this.state.comments.slice(
      indexOfFirstComment,
      indexOfLastComment
    );

    this.renderDomLoadingTime();
    if (this.state.isLoading) {
      return <Loader text={"Loading..."} />;
    } else {
      return (
        <div className="App">
          <Router basename='/'>
            <Container>
              <Row>
                <Col sm={12} className="bg-grey">
                  <Navcustom
                    searchTerm={this.state.searchTerm}
                    onKeyUp={e => this.onKeyUp(e)}
                  />
                  <Switch>
                    <Route exact path="/">
                      <Row className="pl-sm-7 pr-md-20 pl-md-20 mt-2 w-100">
                        <Col sm={12} md={8} lg={6}>
                          <div className="d-flex dropdowns">
                            <h5>Search</h5>
                            <DropdownBtn
                              onClick={e => this.setCurrentList(e)}
                              defaultValue={this.state.currentList}
                              dropChilds={this.state.searchTopic}
                            />
                            <h5>By</h5>
                            <DropdownBtn
                              onClick={e => {
                                this.setCurrentBy(e);
                                this.orderBy(e);
                              }}
                              defaultValue={this.state.currentBy}
                              dropChilds={this.state.searchBy}
                            />
                            <h5>For</h5>
                            <DropdownBtn
                              onClick={e => this.setLastPost(e)}
                              defaultValue={this.state.lastPost}
                              dropChilds={this.state.searchFor}
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={4} lg={6} className="text-right">
                          <div className="resultsNumber">
                            {this.renderResultsNumber()} results (
                            {this.renderDomLoadingTime()})
                          </div>
                        </Col>
                      </Row>
                      <RenderList
                        currentList={this.state.currentList}
                        renderLastPost={() => this.renderLastPosts()}
                        lastPost={this.state.lastPost}
                        posts={currentPosts}
                        comments={currentComments}
                        searchTerm={this.state.searchTerm}
                      />
                      <Pagination
                        hitsPerPage={this.state.hitsPerPage}
                        totalPosts={this.renderResultsNumber()}
                        currentPage={this.state.currentPage}
                        paginate={this.paginate}
                        posts={currentPosts}
                        comments={currentComments}
                      />
                    </Route>
                    <Route exact path="/settings">
                      <Settings
                        hitsPerPage={this.state.hitsPerPage}
                        hanldeChangeHitsPerPage={this.hanldeChangeHitsPerPage}
                        currentList={this.state.currentList}
                        hanldeChangeCurrentList={e =>
                          this.hanldeChangeCurrentList(e)
                        }
                        currentBy={this.state.currentBy}
                        handleChangeCurrentBy={e =>
                          this.handleChangeCurrentBy(e)
                        }
                        lastPost={this.state.lastPost}
                        handleChangeLastPost={e => this.handleChangeLastPost(e)}
                      />
                    </Route>
                    <Route path="/post/:id" component={PostData} />
                  </Switch>
                </Col>
                <Col sm={12} className="p-0">
                  <Footer />
                </Col>
              </Row>
            </Container>
          </Router>
        </div>
      );
    }
  }
}

export default App;
