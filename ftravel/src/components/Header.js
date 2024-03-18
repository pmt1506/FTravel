import React, { useEffect, useState } from "react";
import { Row, Container, Col, Button, Form, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const tourListID = "65e2e9b0d9e75d25d6a2b08e";
  const hotelListID = "65e2e9c5d9e75d25d6a2b090";
  const eventListID = "65e2e9d2d9e75d25d6a2b092";

  useEffect(() => {
    fetch(`http://localhost:9999/service?type=${tourListID}`)
      .then((res) => res.json())
      .then((data) => {
        setTourList(data.servicesByType);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9999/service?type=${hotelListID}`)
      .then((res) => res.json())
      .then((data) => {
        setHotelList(data.servicesByType);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9999/service?type=${eventListID}`)
      .then((res) => res.json())
      .then((data) => {
        setEventList(data.servicesByType);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Filtering search results
    const filteredTours = tourList.filter((tour) =>
      tour.name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredHotels = hotelList.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredEvents = eventList.filter((event) =>
      event.name.toLowerCase().includes(value.toLowerCase())
    );

    // Combining filtered results
    const combinedResults = [...filteredTours, ...filteredHotels, ...filteredEvents];

    // Set the search results state
    setSearchResults(combinedResults);
  };

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
        <Col xs={6} className="mt-4 justify-content-center align-items-center">
          <div className="search-form">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <Dropdown className="search-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Search Results
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {searchResults.map((item, index) => (
                    <Dropdown.Item key={index}>{item.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Col>
        <Col
          xs={3}
          style={{ textAlign: "right", marginTop: "30px" }}
          className="header-right"
        >
          <NavLink to={"/login"} className="align-items-center">
            <Button variant="outline-primary" className="mx-2">
              Login
            </Button>
          </NavLink>
          <NavLink to={"/register"} className="align-items-center">
            <Button variant="outline-success">Register</Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
