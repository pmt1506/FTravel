import React, { useState } from "react";
import { Container, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function LoginModal({ show, setShowLogin }) {
  const handleCloseLogin = () => setShowLogin(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
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

    handleCloseLogin();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Container>
          <Row className="justify-content-center">
            <Modal.Title>Login</Modal.Title>
          </Row>
        </Container>
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
          <Button variant="primary" type="submit">
            Log In
          </Button>
          {/* Add password input field here */}
        </Form>
        <hr />
        <Row className="justify-content-center">
          <div className="justify-content-center">or login with google</div>
        </Row>
        <Row className="justify-content-center">
          <Button variant="danger">
            <Link to={"http://localhost:9999/account/auth/google"}>google</Link>
          </Button>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLogin}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
