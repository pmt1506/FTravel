import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultTemplate from "../../template/DefaultTemplate";
import HomeBanner from "../../components/Tour/HomeBanner";

const Home = () => {
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);

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

  return (
    <DefaultTemplate>
      <Container fluid className="mt-4">
        <Row>
          <Col style={{ padding: "0" }}>
            <HomeBanner />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5 mb-4">
        <Row>
          <Col className="text-center">
            <h1 style={{ fontSize: "48" }}>
              <span>
                <strong style={{ color: "orange" }}>FTravel</strong>
              </span>
            </h1>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Tour</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={"/tour"} className="btn btn-outline-success mt-1">
              See more
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          {tourList.slice(0, 4).map((tour, index) => (
            <Col xs={3} key={index}>
              <Card>
                <Card.Img
                  className="card-thumbnail"
                  variant="top"
                  src={tour.thumbnail}
                />
                <Card.Body>
                  <Card.Title>{tour.title}</Card.Title>
                  <Card.Text>{tour.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Hotel</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={"/hotel"} className="btn btn-outline-success mt-1">
              See more
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          {hotelList.slice(0, 4).map((hotel, index) => (
            <Col xs={3} key={index}>
              <Card>
                <Card.Img
                  className="card-thumbnail"
                  variant="top"
                  src={hotel.thumbnail}
                />
                <Card.Body>
                  <Card.Title>{hotel.title}</Card.Title>
                  <Card.Text>{hotel.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Event</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={"/event"} className="btn btn-outline-success mt-1">
              See more
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          {eventList.slice(0, 4).map((event, index) => (
            <Col xs={3} key={index}>
              <Card>
                <Card.Img
                  className="card-thumbnail"
                  variant="top"
                  src={event.thumbnail}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Home;
