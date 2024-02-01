import React from "react";
import { Navbar, Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" style={{ margin: "auto" }}>
                <NavLink exact to="/" className="nav-link mx-2">Home</NavLink>
                <NavDropdown title="Tour" id="tour-dropdown" className="mx-2">
                  <NavLink to="/tour/destination1" className="dropdown-item" activeClassName="active">Destination 1</NavLink>
                  <NavLink to="/tour/destination2" className="dropdown-item" activeClassName="active">Destination 2</NavLink>
                </NavDropdown>
                <NavDropdown title="Hotel" id="hotel-dropdown" className="mx-2">
                  <NavLink to="/hotel/hotel1" className="dropdown-item" activeClassName="active">Hotel 1</NavLink>
                  <NavLink to="/hotel/hotel2" className="dropdown-item" activeClassName="active">Hotel 2</NavLink>
                </NavDropdown>
                <NavDropdown title="Event" id="event-dropdown" className="mx-2">
                  <NavLink to="/event/event1" className="dropdown-item" activeClassName="active">Event 1</NavLink>
                  <NavLink to="/event/event2" className="dropdown-item" activeClassName="active">Event 2</NavLink>
                </NavDropdown>
                <NavLink to="/about" className="nav-link mx-2">About</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default NavbarComponent;
