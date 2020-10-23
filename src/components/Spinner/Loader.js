import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loader.scss";

const Loader = (props) => {
  return (
    <div className="Loader">
      <Spinner animation="border" variant="danger" />
      <h6>{props.text}</h6>
    </div>
  );
};

export default Loader;
