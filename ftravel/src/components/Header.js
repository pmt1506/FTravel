import React, { useEffect, useState } from "react";
import { Row, Container, Col, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import "../css/header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async (keyword) => {
      if (!keyword) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:9999/service/search?keyword=${encodeURIComponent(
            keyword
          )}`
        );
        const data = await response.json();

        // Check if data.tourList, data.hotelList, and data.eventList are iterable
        const updatedTourList = Array.isArray(data.tourList)
          ? data.tourList
          : [];
        const updatedHotelList = Array.isArray(data.hotelList)
          ? data.hotelList
          : [];
        const updatedEventList = Array.isArray(data.eventList)
          ? data.eventList
          : [];

        setTourList(updatedTourList);
        setHotelList(updatedHotelList);
        setEventList(updatedEventList);
        setSearchResults([
          ...updatedTourList,
          ...updatedHotelList,
          ...updatedEventList,
        ]);
        console.log(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults(searchTerm);
  }, [searchTerm]);

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
                {tourList.length > 0 && (
                  <div>
                    <h4 className="text-center">Tour</h4>
                    <ul>
                      {tourList.map((item, index) => (
                        <li key={index} className="d-flex">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="search-results-image"
                          />
                          <NavLink to={`/detail/${item._id}`}>
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hotelList.length > 0 && (
                  <div>
                    <h4 className="text-center">Hotel</h4>
                    <ul>
                      {hotelList.map((item, index) => (
                        <li key={index} className="d-flex">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="search-results-image"
                          />
                          <NavLink to={`/detail/${item._id}`}>
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {eventList.length > 0 && (
                  <div>
                    <h4 className="text-center">Event</h4>
                    <ul>
                      {eventList.map((item, index) => (
                        <li key={index} className="d-flex">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="search-results-image"
                          />
                          <NavLink to={`/detail/${item._id}`}>
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
