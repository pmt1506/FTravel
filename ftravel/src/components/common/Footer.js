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
            Chào mừng bạn đến với FTravel - Người bạn du lịch tuyệt vời nhất của
            bạn. Khám phá thế giới cùng chúng tôi!
          </p>
        </Col>
        <Col md={4}>
          <h5>Liên kết nhanh</h5>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li>
              <a href="/">Tours</a>
            </li>
            <li>
              <a href="/">Khách sạn</a>
            </li>
            <li>
              <a href="/">Sự kiện</a>
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Liên hệ</h5>
          <p>Email: info@ftravel.com</p>
          <p>Điện thoại: +1 (123) 456-7890</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
