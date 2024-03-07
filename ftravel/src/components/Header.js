import { Row, Container, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import LoginModal from "./LoginModal";
import { useState } from "react";
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  return (
    <Container className="header-app">
      <Row>
        <Col xs={3} className="header-left">
          <NavLink
            to={"/"}
            className="d-flex align-items-center"
            style={{ textDecoration: "none" }}
          >
            <img src={logo} alt="logo" width={100} height={100} />
            <h1>FTravel</h1>
          </NavLink>
        </Col>
        <Col
          xs={9}
          style={{ textAlign: "right", marginTop: "30px" }}
          className="header-right"
        >
          <NavLink className="align-items-center">
            <Button
              variant="outline-primary"
              className="mx-2"
              onClick={handleShowLogin}
            >
              Login
            </Button>
          </NavLink>
          <NavLink to={"/register"} className="align-items-center">
            <Button variant="outline-success">Register</Button>
          </NavLink>
        </Col>
      </Row>
      <LoginModal show={showLogin} setShowLogin={setShowLogin} />
    </Container>
  );
};

export default Header;
