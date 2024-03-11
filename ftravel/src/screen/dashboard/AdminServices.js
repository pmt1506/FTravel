import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import { Col, Row } from 'react-bootstrap'
import '../../css/DashboardServices.css'

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const tourListID = "65d440dd4ba915fa5c498398";
  const hotelListID = "65e2e9c5d9e75d25d6a2b090";
  const eventListID = "65e2e9d2d9e75d25d6a2b092";

  // chơi bỉn
  const serviceTypes = {
    "65e2e9b0d9e75d25d6a2b08e": "Tour",
    "65e2e9c5d9e75d25d6a2b090": "Hotel",
    "65e2e9d2d9e75d25d6a2b092": "Event"
  };
  useEffect(() => {
    fetch("http://localhost:9999/service/all?pageSize=5")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllServices(data.allServices);
        // Use data.allServices to filter based on type
        setTourList(
          data.allServices.filter((service) => service.type === tourListID)
        );
        setHotelList(
          data.allServices.filter((service) => service.type === hotelListID)
        );
        setEventList(
          data.allServices.filter((service) => service.type === eventListID)
        );
      });
  }, []);
  return (
    <DashboardTemplate title="Manage Service">
      <Row className="m-3">
        Action Bar
      </Row>
      <Row className="m-3">
        {allServices.map(service => (
          <div className="item-list" key={service._id}>
            <Row>
              <Col md={3}>
                <div className="featured">Đặc sắc</div>
                <div className="thumb-image">
                  <a href="#" target="_blank">
                    <img src={service.thumbnail} className="img-responsive" alt="" />
                  </a>
                </div>
              </Col>
              <Col md={9}>
                <div className="item-title">
                  <a href="https://ongvove.com/tour/kham-pha-tour-hon-thom-phu-quoc" target="_blank">
                    {service.title}
                  </a>
                </div>
                <div className="item-title2">
                  <i className="icofont-license"></i>
                  Kiểu dịch vụ: <span className="badge badge-info">
                  {/* {console.log(service.type.serviceName)}
                  {service.type} */}
                  {serviceTypes[service.type]}
                  </span>
                </div>
                <div className="item-title2">
                  <i className="icofont-paper-plane"></i>
                  Địa điểm: {service.city}
                </div>
                <div className="item-title2">
                  <i className="icofont-money"></i>
                  Giá bán: <span className="sale-price"></span> <span className="price">{service.price}</span>
                </div>
                <div className="item-title2 rate">
                  <i className="icofont-badge"></i>
                  <div className="service-review tour-review-0">
                    <span className="review">
                      0 Đánh giá
                    </span>
                    <div className="list-star">
                      {/* <ul className="booking-item-rating-stars row">
                      <li><i className="fa fa-star-o"></i></li>
                      <li><i className="fa fa-star-o"></i></li>
                      <li><i className="fa fa-star-o"></i></li>
                      <li><i className="fa fa-star-o"></i></li>
                      <li><i className="fa fa-star-o"></i></li>
                    </ul>
                    <div className="booking-item-rating-stars-active row" style={{ width: "0%" }}>
                      <ul className="booking-item-rating-stars">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                      </ul>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="control-action">
                  {/* <a href="#" className="btn btn-info">View</a> */}
                  <a href="#" className="btn btn-danger">Hide</a>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Row>

    </DashboardTemplate>
  )
}

export default Services