import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DefaultTemplate from "../../template/DefaultTemplate.js";
import parse from "html-react-parser";

const Detail = () => {
  const { serviceID } = useParams();
  const [value, setValue] = useState(1);
  const [service, setService] = useState([]);
  const [type, setType] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const userID = localStorage.getItem("userID");

  const duration = calculateDuration(service.startDate, service.endDate);

  useEffect(() => {
    fetch(`http://localhost:9999/service/${serviceID}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setType(data.type);
      });
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const addToCart = async (e) => {
    e.preventDefault();
    const requestData = {
      userID: userID,
      serviceID: serviceID,
    };
    try {
      const res = await fetch("http://localhost:9999/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        const data = await res.json();
        toast.error(data.message);
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
    // Multiply the price by 1000
    const priceInDong = priceInVND * 1000;

    // Format the price with dot separators for thousands
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    // Format the price and add "VND" currency symbol
    const formattedPrice = formatter.format(priceInDong);

    return formattedPrice;
  }

  function calculateDuration(startDate, endDate) {
    // Convert the ISO date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const difference = end - start;

    // Convert milliseconds to days
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days;
  }

  return (
    <DefaultTemplate>
      <Container className="mt-1">
        <Row className="gx-5">
          <Col lg={6}>
            {service.thumbnails && service.thumbnails.length > 0 && (
              <img
                src={service.thumbnails[selectedImageIndex].url}
                alt="Service Image"
                className="selected-image img"
              />
            )}
            {service.thumbnails && service.thumbnails.length > 1 && (
              <div className="row mt-3">
                {/* Display thumbnails for other images in the same row */}
                {service.thumbnails.map((image, index) => (
                  <div
                    key={index}
                    className="col-4"
                    style={{
                      transition: "transform 0.2s ease-out",
                      transform:
                        index === selectedImageIndex ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index}`}
                      className={`img-thumbnail ${index === selectedImageIndex ? "selected-thumbnail" : ""
                        }`}
                      style={{ cursor: "pointer", width: "100%" }}
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                ))}
              </div>
            )}
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
                  <i className="bi bi-person-fill fa-sm mx-1"></i>14 người
                </span>
                <div className="flex-grow-1"></div>
                <label className="mb-2 d-block">
                  <strong>Lịch trình:</strong>
                  <span className="mx-1">{duration} ngày</span>
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
                    <strong>Ngày bắt đầu:</strong>
                    <span className="mx-1">
                      {formatDate(service.startDate)}
                    </span>
                  </label>
                </div>
                <div className="col-12">
                  <label className="mb-2 d-block">
                    <strong>Ngày kết thúc:</strong>
                    <span className="mx-1">{formatDate(service.endDate)}</span>
                  </label>
                </div>
              </div>
            </div>

            <Row style={{ marginLeft: "1px" }}>
              <a href="#" className="btn btn-warning shadow-0 mr-2">
                Đặt ngay
              </a>
              <Button
                onClick={addToCart}
                className="btn btn-primary shadow-0 mr-2"
              >
                <i className="bi bi-cart3"></i> Thêm vào giỏ hàng
              </Button>
              <ToastContainer />
            </Row>
          </Col>
          <div className="col-12">
            <hr />
            {typeof service.description === "string" &&
              parse(service.description)}
          </div>
        </Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Detail;
