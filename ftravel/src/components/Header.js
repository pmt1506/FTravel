import React, { useEffect, useState } from "react";
import { Row, Container, Col, Button, Form, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import "../css/header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [tourList, setTourList] = useState([]);
  //   const [hotelList, setHotelList] = useState([]);
  //   const [eventList, setEventList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const tourListID = "65e2e9b0d9e75d25d6a2b08e";
  const hotelListID = "65e2e9c5d9e75d25d6a2b090";
  const eventListID = "65e2e9d2d9e75d25d6a2b092";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search terms: ", e.target.value);
    fetchSearchResults(e.target.value);
  };

  const fetchSearchResults = (keyword) => {
    if (!keyword) {
      setSearchResults([]); // Set search results to an empty array if keyword is empty
      return;
    }

    fetch(
      `http://localhost:9999/service/search?keyword=${encodeURIComponent(
        keyword
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        console.log(data); // Assuming the API returns an array of results
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
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
            {/* render search result here */}
            {searchResults.length > 0 && (
              <div className="search-results">
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} className="d-flex">
                      <img
                        src={result.thumbnail}
                        alt={result.title}
                        className="search-results-image"
                      />
                      {result.title}
                    </li>
                  ))}
                </ul>
              </div>
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
