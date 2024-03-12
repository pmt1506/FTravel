import React, { useState } from "react";
import { Container, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
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
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        const token = Cookie.get("accessToken");
        console.log(token);
        // alert(data.message);
        localStorage.setItem("userID", data.data._id);
        // Additional logic to handle successful login, such as setting user session
      } else {
        const data = await response.json();
        toast.warning(data.error);
        // Additional logic to handle login failure, such as displaying an error message
      }
    } catch (error) {
      toast.error("An error occurred:", error);
      // Additional error handling logic
    }

    handleCloseLogin();
  };
  const googleLogin = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:9999/account/googleLogin",
        { method: "POST" }
      );
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
      }

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse?.credential);
              googleLogin(credentialResponse?.credential);
            }}
            onError={() => {
              toast.error("Something went wrong");
            }}
            text="Login with google"
            size={"large"}
            width={"395px"}
          />
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
