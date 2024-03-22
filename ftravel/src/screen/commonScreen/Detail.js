import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DefaultTemplate from "../../template/DefaultTemplate.js";
import parse from "html-react-parser";
import "../../css/detail.css";
const Detail = () => {
  const { serviceID } = useParams();
  const [value, setValue] = useState(1);
  const [service, setService] = useState([]);
  const [type, setType] = useState([]);
  const [price, setPrice] = useState(0);
  const duration = calculateDuration(service.startDate, service.endDate);
  const [comment, setComment] = useState([]);
  const [content, setComtent] = useState("");
  const [ref, setRef] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:9999/service/${serviceID}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setType(data.type);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:9999/comment/${serviceID}`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
      });
  }, [ref]);

  const addToCart = async (e) => {
    e.preventDefault();
    const requestData = {
      serviceID: serviceID,
    };
    try {
      const res = await fetch("http://localhost:9999/cart", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else if (res.status === 401) {
        const data = await res.json();
        toast.error(data.error);
      } else if (res.status === 403) {
        const data = await res.json();
        toast.error(data.message);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
  const addToBill = async (e) => {
    e.preventDefault();
    const requestData = {
      serviceID: serviceID,
      price: price,
    };
    try {
      const res = await fetch("http://localhost:9999/bill/add", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else if (res.status === 401) {
        const data = await res.json();
        toast.error(data.error);
      } else if (res.status === 403) {
        const data = await res.json();
        toast.error(data.message);
      } else {
        const data = await res.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
  function formatDate(dateString) {
    // Convert the ISO date string to a Date object
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad single digit day or month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Format the date as "dd/mm/yyyy"
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  function formatPrice(priceInVND) {
    // Format the price with dot separators for thousands
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    // Format the price and add "VND" currency symbol
    const formattedPrice = formatter.format(priceInVND);

    return formattedPrice;
  }

  function calculateDuration(startDate, endDate) {
    // Convert the ISO date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const difference = end - start;
    if (difference === 0) {
      return 1;
    }

    // Convert milliseconds to days
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days;
  }
  const handleComment = async (e) => {
    e.preventDefault();
    const requestData = {
      serviceID: serviceID,
      content: content,
    };
    try {
      const res = await fetch("http://localhost:9999/comment/add", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        ref = 1 ? setRef(2) : setRef(1);
        setComtent("");
        toast.success(data.message);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DefaultTemplate>
      <Container className="mt-1">
        <Row className="gx-5">
          <Col lg={6}>
            <img
              style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
              className="rounded-4 fit"
              src={service.thumbnail}
            />
          </Col>
          <Col lg={6}>
            <div className="ps-lg-3">
              <h4 className="title text-dark">{service.title}</h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                  <span className="ms-2">4.5</span>
                </div>
                <span className="text-muted">
                  <i className="bi bi-person-fill fa-sm mx-1"></i>14 persons
                </span>
                <div className="flex-grow-1"></div>
                <label className="mb-2 d-block">
                  <strong>Duration:</strong>
                  <span className="mx-1">{duration} days</span>
                </label>
              </div>

              <div className="mb-3">
                <span className="h5">{formatPrice(service.price)}</span>
              </div>

              <div className="row">
                <div className="col-12">
                  <dd>
                    <strong>Danh mục:</strong> Tour
                  </dd>
                </div>
                <div className="col-12">
                  <dd>
                    <strong>Số người:</strong> {service.slot}
                  </dd>
                </div>
                <div className="col-12">
                  <dd>
                    <strong>Khu vực:</strong> {service.region}
                  </dd>
                </div>
                <div className="col-12">
                  <dd>
                    <strong>Tỉnh/Thành phố:</strong> {service.city}
                  </dd>
                </div>
                <div className="col-12">
                  <label className="mb-2 d-block">
                    <strong>Start date:</strong>
                    <span className="mx-1">
                      {formatDate(service.startDate)}
                    </span>
                  </label>
                </div>
                <div className="col-12">
                  <label className="mb-2 d-block">
                    <strong>End date:</strong>
                    <span className="mx-1">{formatDate(service.endDate)}</span>
                  </label>
                </div>
              </div>
            </div>

            <Row style={{ marginLeft: "1px" }}>
              <Button
                onClick={addToBill}
                className="btn btn-warning shadow-0 mr-2"
              >
                Book now
              </Button>
              <Button
                onClick={addToCart}
                className="btn btn-primary shadow-0 mr-2"
              >
                <i className="bi bi-cart3"></i> Add to cart
              </Button>
              <ToastContainer />
            </Row>
          </Col>
          <div className="col-12 service-description">
            <hr />
            {typeof service.description === "string" &&
              parse(service.description)}
          </div>
        </Row>
        <Row></Row>
        <hr />
        <h3>Comments:</h3>
        {comment.map((c) => (
          <div className="d-flex border p-3" key={c._id}>
            <div className="me-2">
              <img
                src={c.username.avatarIMG}
                className="rounded-circle"
                width="50"
                height="50"
                alt="User Avatar"
              />
            </div>
            <div className="ms-1" style={{ paddingLeft: "10px" }}>
              <p
                className="name-comment mb-0"
                style={{ fontSize: "14px", color: "grey" }}
              >
                {c.username.username}
              </p>
              <p className=" content-comment mb-0">{c.content}</p>
            </div>
          </div>
        ))}{" "}
        <Form onSubmit={handleComment} className="pt-3 d-flex">
          <Form.Control
            onChange={(e) => {
              setComtent(e.target.value);
            }}
            type="text"
            placeholder="Để lại cảm nhận của bạn"
          />
          <Button type="submit">GỬI</Button>
        </Form>
      </Container>
    </DefaultTemplate>
  );
};

export default Detail;
