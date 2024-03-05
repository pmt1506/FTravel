import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import { Col, Row } from 'react-bootstrap'
import '../../css/Services.css'

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const tourListID = "65d440dd4ba915fa5c498398";
  const hotelListID = "65d235961ade018d66152d24";
  const eventListID = "65d440fb4ba915fa5c498399";

  useEffect(() => {
    fetch("http://localhost:9999/service")
      .then((res) => res.json())
      .then((data) => {
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
    <DashboardTemplate title="Manage Services">
      <Row className="m-3">
        <div className="item-list">
          <Row>
            <Col md={3}>
              <div className="featured">Đặc sắc</div>
              <div className="thumb-image">
                <a href="#" target="_blank">
                  <img src="https://ongvove.com/uploads/0002/2743/2023/08/25/img-1690970445387-1691072915953-600.jpg" className="img-responsive" alt="" />
                </a>
              </div>
            </Col>
            <Col md={9}>
              <div className="item-title">
                <a href="https://ongvove.com/tour/kham-pha-tour-hon-thom-phu-quoc" target="_blank">
                  Khám phá Tour Hòn Thơm Phú Quốc - Tour Phú Quốc 1N
                </a>
              </div>
              <div className="item-title2">
                <i className="icofont-license"></i>
                Kiểu dịch vụ: <span className="badge badge-info">Tour</span>
              </div>
              <div className="item-title2">
                <i className="icofont-paper-plane"></i>
                Địa điểm: Phú Quốc
              </div>
              <div className="item-title2">
                <i className="icofont-money"></i>
                Giá bán: <span className="sale-price"></span> <span className="price">0 ₫</span>
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
                <a href="https://ongvove.com/tour/kham-pha-tour-hon-thom-phu-quoc" target="_blank" className="btn btn-info">View</a>
                <a href="https://ongvove.com/user/wishlist/remove?id=128&amp;type=tour" className="btn btn-danger">Hide</a>
              </div>
            </Col>
          </Row>
        </div>

      </Row>

    </DashboardTemplate>
  )
}

export default Services