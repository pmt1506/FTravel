import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
function RegisterModal({ show, setShowReg }) {
  const handleCloseReg = () => setShowReg(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          rePassword: rePassword,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        localStorage.setItem("userID", data.rs._id);

        // Additional logic to handle successful login, such as setting user session
      } else {
        const data = await response.json();
        alert(data.error);
        // Additional logic to handle login failure, such as displaying an error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Additional error handling logic
    }

    handleCloseReg();
  };

  return (
    <Modal show={show} style={{ marginTop: "8rem" }}>
      <Modal.Header>
        <Container>
          <Row className="justify-content-center">
            <Modal.Title>Đăng kí</Modal.Title>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Địa chỉ Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập địa chỉ Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="rePassword">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              autoComplete="new-password"
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="userName">
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />

          <Row className="justify-content-center">
            <div>
              <Button
                className="btn-btn-success"
                type="submit"
                variant="success"
              >
                Đăng kí ngay
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseReg}>
          <i class="bi bi-x-lg mr-1"></i>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
