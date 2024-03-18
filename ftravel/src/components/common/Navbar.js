import React from "react";
import { Navbar, Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../css/Layout.css";

const NavbarComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" style={{ margin: "auto" }}>
                <NavLink
                  exact
                  to="/"
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/tour"
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Tour
                </NavLink>
                <NavLink
                  to="/hotel"
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Hotel
                </NavLink>
                <NavLink
                  to="/event"
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Event
                </NavLink>
                <NavLink
                  to="/about"
                  className="nav-link mx-2"
                  id="about"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  About
                </NavLink>
                <NavLink
                  to="/vendor-list"
                  className="nav-link mx-2"
                  id="vendor-list"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Vendor List
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default NavbarComponent;
