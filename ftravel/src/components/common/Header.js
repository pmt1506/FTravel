import { Row, Container, Col, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useEffect, useState } from "react";
import '../../css/header.css';


const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      } catch (error) {
        // Suppress error logging for unsuccessful HTTP requests
        if (error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  const handleItemSelection = () => {
    setIsSearchFocused(true);
    setSearchTerm("");
    setTourList([]);
    setHotelList([]);
    setEventList([]);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
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
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              // onBlur={handleSearchBlur}
              onFocus={handleSearchFocus}
            />
            {/* render search result here */}
            {searchResults.length > 0 && isSearchFocused && (
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
                          <NavLink
                            to={`/detail/${item._id}`}
                            onClick={handleItemSelection}
                          >
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
                          <NavLink
                            to={`/detail/${item._id}`}
                            onClick={handleItemSelection}
                          >
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
                          <NavLink
                            to={`/detail/${item._id}`}
                            onClick={handleItemSelection}
                          >
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
          <NavLink className="align-items-center">
            <Button
              variant="outline-primary"
              className="mx-2"
              onClick={handleShowLogin}
            >
              Login
            </Button>
          </NavLink>
          <NavLink className="align-items-center">
            <Button variant="outline-success" onClick={handleShowReg}>
              Register
            </Button>
          </NavLink>
        </Col>
      </Row>
      <LoginModal show={showLogin} setShowLogin={setShowLogin} />
      <RegisterModal show={showReg} setShowReg={setShowReg} />
    </Container>
  );
};

export default Header;
