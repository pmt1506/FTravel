import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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
  const useID = localStorage.getItem("userID");
  fetch("");

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="rePassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Add password input field here */}
        </Form>
        <hr />

        <Row className="justify-content-center">
          <div>
            <Button className="btn-btn-success" type="submit">
              Register
            </Button>
          </div>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseReg}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
