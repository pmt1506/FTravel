import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultTemplate from "../../template/DefaultTemplate";

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
            <Card className="bg-dark text-white">
              <Card.Img
                src="https://petapixel.com/assets/uploads/2022/08/fdfs19-800x533.jpg"
                alt="Card image"
                height="450px"
              />
              <Card.ImgOverlay>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
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
      {/* List favorited locations */}
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Favorited Locations</h2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <div className="location-item">
              <a href="#">
                <div className="location-image">
                  <img
                    src="https://picsum.photos/200"
                    alt="#"
                    style={{ width: "100%" }}
                  />
                  <div className="effect"></div>
                  <div className="location-content" style={{ height: "250px" }}>
                    <p className="title text-center pt-5">Đà Lạt</p>
                    <div className="location-summary">
                      <span>xx province</span>
                      <span>xx province</span>
                      <span>xx province</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Vendor</h2>
          </Col>
        </Row>
      </Container>
      {/* Vendor list */}
      <Container className="mb-3">
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://picsum.photos/200"
                className="rounded-circle"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-success">See more</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://picsum.photos/200"
                className="rounded-circle"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-success">See more</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://picsum.photos/200"
                className="rounded-circle"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-success">See more</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://picsum.photos/200"
                className="rounded-circle"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-success">See more</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Link to={"/vendor-list"} className="btn btn-success mt-1">
            See all vendors
          </Link>
        </div>
      </Container>
    </DefaultTemplate>
  );
};

export default Home;
