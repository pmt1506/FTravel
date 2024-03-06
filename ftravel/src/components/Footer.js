import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="footer-app mt-4">
      <hr />
      <Row className="footer-component">
        <Col md={4}>
          <h5>FTravel</h5>
          <p>
            Welcome to FTravel - Your Ultimate Travel Companion. Explore the
            world with us!
          </p>
        </Col>
        <Col md={4}>
          <h5>Quick Links</h5>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li>
              <a href="/">Tours</a>
            </li>
            <li>
              <a href="/">Hotels</a>
            </li>
            <li>
              <a href="/">Events</a>
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Contact Us</h5>
          <p>Email: info@ftravel.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
