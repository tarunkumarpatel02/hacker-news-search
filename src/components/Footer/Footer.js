import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="Footer text-center mt-3 mb-3">
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Link to={"/settings"}>Settings</Link>
          </Col>
          <Col sm={12} md={6}>
            <a href="https://github.com/tarunkumarpatel02" target="_blank" rel="noopener noreferrer">
              Github Repository
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
