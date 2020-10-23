import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Search from "../Search/Search";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navcustom = (props) => {
  return (
    <React.Fragment>
      <Navbar variant="dark" className="color-nav">
        <Link to={'/'}>
        <Navbar.Brand href=""><img src={logo} alt={logo} /></Navbar.Brand>
        </Link>
        <Search searchTerm={props.searchTerm} onKeyUp={props.onKeyUp} />
        <Nav.Item>
          <Link to={'/settings'} className="custom-nav-link">
            <i className="fas fa-cogs"></i>
            <span>Settings</span>
          </Link>
        </Nav.Item>
      </Navbar>
    </React.Fragment>
  );
};

export default Navcustom;
