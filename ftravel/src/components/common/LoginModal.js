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
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
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
        { method: "POST", body: { token: token } }
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
    <Modal show={show} style={{ marginTop: "8rem" }}>
      <Modal.Header>
        <Container>
          <Row className="justify-content-center">
            <Modal.Title>Đăng nhập</Modal.Title>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
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
          <div className="text-center mt-3">
            {/* Wrap the button inside a div with text-center class */}
            <Button variant="success" type="submit">
              Login
            </Button>
          </div>
        </Form>

        <hr />
        <Row className="justify-content-center">
          <div className="justify-content-center">
            Hoặc đăng nhập bằng Google
          </div>
        </Row>
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse?.credential);
            googleLogin(credentialResponse?.credential);
          }}
          onError={() => {
            toast.error("Something went wrong");
          }}
          text="Login with google"
          size={"large"}
          width={"395px"}
        /> */}
        <Row className="justify-content-center mt-2">
          <Link to="http://localhost:9999/account/auth/google">
            <Button variant="primary" className="google-sign-in-button">
              <i class="bi bi-google mr-2"></i>
              Sign in with Google
            </Button>
          </Link>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLogin}>
          <i class="bi bi-x-lg mr-1"></i>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
