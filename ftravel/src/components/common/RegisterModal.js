import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function RegisterModal({ show, setShowReg }) {
  const handleCloseReg = () => setShowReg(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., login request)
    // Retrieve form data using e.target.elements
    // Example: const email = e.target.elements.email.value;
    // Close the modal after submission: handleClose();
    handleCloseReg();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Register</Modal.Title>
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
          <Form.Group controlId="rePassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Add password input field here */}
        </Form>
        <hr />
        <Row className="justify-content-center">
          <div>or register with google</div>
        </Row>
        <Row className="justify-content-center">
          {" "}
          <div>
            <Button className="btn-btn-success">Google</Button>
          </div>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseReg}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
