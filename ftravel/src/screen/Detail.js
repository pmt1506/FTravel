import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
        setType(data.type);
      });
  });

  const handleMinus = () => {
    setValue((prevValue) => Math.max(prevValue - 1, 0));
  };

  const handlePlusClick = () => {
    setValue((prevValue) => Math.min(prevValue + 1, service.slot));
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue)) {
      setValue(Math.min(inputValue, service.slot));
    }
  };

  return (
    <Container className="py-5">
      <Row className="gx-5">
        <Col
          lg={6}
          className="border rounded-4 p-0 d-flex justify-content-center"
        >
          <a
            data-fslightbox="mygalley"
            class="rounded-4"
            target="_blank"
            data-type="image"
          >
            <img
              style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
              class="rounded-4 fit"
              src="https://bizweb.dktcdn.net/100/438/408/files/hinh-anh-meo-hai-huoc-yodyvn2.jpg?v=1694069335855"
            />
          </a>
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
              <span class="h5">{service.price}</span>
            </div>

            <p>{service.description}</p>

            <Row>
              <dt class="col-3">Type:</dt>
              {/* <dd class="col-9">{service.type.serviceName}</dd> */}
              <td>muahaha</td>
              <dt class="col-3">Group size:</dt>
              <dd class="col-9">
                <span className="text-muted">{service.slot}</span>
              </dd>

              <dt class="col-3">Place:</dt>
              <dd class="col-9">{service.city}</dd>
            </Row>

            <hr />

            <Row className="mb-4">
              <div className="col-md-4 col-6">
                <label className="mb-2 d-block">
                  Start date:<span className="mx-1">{service.startDate}</span>
                </label>
              </div>
              {/* <div class="col-md-4 col-6 mb-3">
                <label class="mb-2 d-block">Slot</label>
                <div class="input-group mb-3" style={{ width: "170px" }}>
                  <div
                    class="btn btn-white border border-secondary px-3"
                    type="button"
                    data-mdb-ripple-color="dark"
                    onClick={handleMinus}
                  >
                    <i class="bi bi-dash"></i>
                  </div>
                  <input
                    type="text"
                    class="form-control text-center border border-secondary"
                    onChange={handleInputChange}
                    value={service.slot}
                  />
                  <div
                    class="btn btn-white border border-secondary px-3"
                    type="button"
                    data-mdb-ripple-color="dark"
                    onClick={handlePlusClick}
                  >
                    <i class="bi bi-plus"></i>
                  </div>
                </div>
              </div> */}
            </Row>
            <Row style={{ marginLeft: "1px" }}>
              <a href="#" className="btn btn-warning shadow-0 mr-2">
                {" "}
                Book now{" "}
              </a>
              <a href="#" className="btn btn-primary shadow-0 mr-2">
                {" "}
                <i class="bi bi-cart3"></i> Add to cart{" "}
              </a>
              <a
                href="#"
                className="btn btn-light border border-secondary py-2 icon-hover px-3"
              >
                {" "}
                Add to wishlist{" "}
              </a>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
