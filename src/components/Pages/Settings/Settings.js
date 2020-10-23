import React from "react";
import "./Settings.scss";

const Settings = props => {
  return (
    <div className="Settings">
      <h3>Settings</h3>
      <div className="options">
        <div className="display-options mb-3">
          <h6>
            Hits per page <i className="fas fa-poll-h"></i>
          </h6>
          <select
            value={props.hitsPerPage}
            onChange={props.hanldeChangeHitsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="rankingOptions">
          <div className="search mb-3">
            <h6>
              Search <i className="fas fa-book-open"></i>
            </h6>
            <select
              value={props.currentList}
              onChange={e => props.hanldeChangeCurrentList(e)}
            >
              <option value="All">All</option>
              <option value="Stories">Stories</option>
              <option value="Comments">Comments</option>
            </select>
          </div>
          <div className="searchBy mb-3">
            <h6>
              Search By <i className="fas fa-fire-alt"></i>
            </h6>
            <select
              value={props.currentBy}
              onChange={e => props.handleChangeCurrentBy(e)}
            >
              <option value="Popularity">Popularity</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className="searchFor mb-3">
            <h6>
              Search For <i className="fas fa-history"></i>
            </h6>
            <select
              value={props.lastPost}
              onChange={e => props.handleChangeLastPost(e)}
            >
              <option value="All Time">All Time</option>
              <option value="Last 24h">Last 24h</option>
              <option value="Past Week">Past Week</option>
              <option value="Past Month">Past Month</option>
              <option value="Past Year">Past Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
