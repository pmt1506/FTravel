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
                  to={"/"}
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Trang chủ
                </NavLink>
                <NavLink
                  to={"/tour"}
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
                  to={"/hotel"}
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Khách sạn
                </NavLink>
                <NavLink
                  to={"/event"}
                  className="nav-link mx-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Sự kiện
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
                  Về chúng tôi
                </NavLink>
                <NavLink
                  to={"/vendor-list"}
                  className="nav-link mx-2"
                  id="vendor-list"
                  style={{
                    fontWeight: "600",
                    fontSize: "14",
                    textTransform: "uppercase",
                  }}
                >
                  Danh sách nhà cung cấp
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
