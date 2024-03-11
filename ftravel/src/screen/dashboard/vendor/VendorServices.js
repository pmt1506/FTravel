import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../../template/DashboardTemplate'
import { Col, Row } from 'react-bootstrap'
import '../../../css/Dashboard.css'

const VendorServices = () => {
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

  //fetch by account id - change after authen
  const accountID = "65e33ed3eb4daa89c995957f"
  useEffect(() => {
    // fetch(`http://localhost:9999/service/vendor?accountID=65e33ed3eb4daa89c995957f`)
    fetch(`http://localhost:9999/service/vendor?accountID=${accountID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllServices(data.servicesByVendor);
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
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  return (
    <DashboardTemplate title="Manage Service (vendor)">
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
                  <a href="#" target="_blank">
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
                  </div>
                </div>
                <div className="control-action">
                  <a href="#" className="btn btn-info">View</a>
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

export default VendorServices