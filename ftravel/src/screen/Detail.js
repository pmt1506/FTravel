import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { serviceID } = useParams();
  const [value, setValue] = useState(1);
  const [service, setService] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/service/${serviceID}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setType(data.type)
      });
  }, []);

  var startDateString = service.startDate;

  var startDate = new Date(startDateString);

  var day = startDate.getDate();
  var month = startDate.getMonth() + 1;
  var year = startDate.getFullYear();

  var formattedDate = day + "/" + month + "/" + year;

  return (
    <Container className="py-5">
      <Row className="gx-5">
        <Col lg={6}>
          <img
            style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
            class="rounded-4 fit"
            src={service.thumbnail}
          />
        </Col>
        <Col lg={6}>
          <div className="ps-lg-3">
            <h4 class="title text-dark">{service.title}</h4>
            <div class="d-flex flex-row my-3">
              <div class="text-warning mb-1 me-2">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
                <span class="ms-2">4.5</span>
              </div>
              <span className="text-muted">
                <i class="bi bi-person-fill fa-sm mx-1"></i>14 persons
              </span>
            </div>

            <div class="mb-3">
              <span class="h5">{service.price}$</span>
            </div>

            <p>{service.description}</p>

            <div className="col-3">
              <Row>
                <dt>Type:</dt>
                {/* <td style={{ marginLeft: "5px" }}>{service.type}</td> */}
                <td style={{ marginLeft: "5px" }}>Tour</td>
              </Row>
              <Row>
                <dt>Group size:</dt>
                <dd>
                  <span className="text-muted" style={{ marginLeft: "5px" }}>{service.slot}</span>
                </dd>
              </Row>
              <Row>
                <dt>Region:</dt>
                <dd style={{ marginLeft: "5px" }}>{service.region}</dd>
              </Row>
              <Row>
                <dt>Place:</dt>
                <dd style={{ marginLeft: "5px" }}>{service.city}</dd>
              </Row>
            </div>
            <hr />

            <Row className="mb-4">
              <div className="col-md-4 col-6">
                <label className="mb-2 d-block">
                  Start date:<span className="mx-1">{formattedDate}</span>
                </label>
              </div>
            </Row>
            <Row style={{ marginLeft: "1px" }}>
              <a href="#" className="btn btn-warning shadow-0 mr-2">
                {" "}
                Book now{" "}
              </a>
              <Link to={"/"} className="btn btn-primary shadow-0 mr-2">
                {" "}
                <i class="bi bi-cart3"></i> Add to cart{" "}
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
