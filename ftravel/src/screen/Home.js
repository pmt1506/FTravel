import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
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
            <Button variant="outline-success">See more</Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Hotel</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-success">See more</Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <h2>Featured Event</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-success">See more</Button>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
                    <p class="title text-center pt-5">Đà Lạt</p>
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
          <Col className="d-flex justify-content-end">
            <Button variant="outline-success">See more</Button>
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
          <Button variant="success">See all vendors</Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
