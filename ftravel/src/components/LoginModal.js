import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function LoginModal({ show, setShowLogin }) {
  const handleCloseLogin = () => setShowLogin(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., login request)
    // Retrieve form data using e.target.elements
    // Example: const email = e.target.elements.email.value;
    // Close the modal after submission: handleClose();
    handleCloseLogin();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>
          {/* Add password input field here */}
        </Form>
        <hr />
        <div className="justify-content-center">or login with google</div>
        <Button className="btn-btn-success">Google</Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLogin}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
