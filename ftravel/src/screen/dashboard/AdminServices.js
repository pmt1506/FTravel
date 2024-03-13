import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import { Button, Col, Form, Row } from 'react-bootstrap'
import '../../css/DashboardServices.css'

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [tourList, setTourList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  useEffect(() => {
    const results = allServices.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, allServices]);

  const fetchData = () => {
    fetch(`http://localhost:9999/service/all?pageSize=${itemsPerPage}&pageNumber=${currentPage}`)
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
  };

  // Tính index bắt đầu của mục đầu tiên trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allServices.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Searching
  const handleSearch = () => {
    setSearchResults(allServices.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <DashboardTemplate title="Manage Service">
      <Row className="m-3 ml-auto">
        <Col >
          <Form.Control style={{width: "20rem"}}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)
            }
          />
          {/* <Button onClick={handleSearch}>Search</Button> */}
        </Col>
        <Col >
          <ul className="pagination">
            {Array.from({ length: Math.ceil((searchTerm ? searchResults.length : allServices.length) / itemsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row className="m-3">
        {searchTerm ? (
          searchResults.length > 0 ? (
            searchResults.map(service => (
              <div className="item-list" key={service._id}>
                <Row>
                  <Col md={3}>
                    <div className="featured">Đặc sắc</div>
                    <div className="thumb-image">
                      <a href="#" >
                        <img src={service.thumbnail} className="img-responsive" alt="" />
                      </a>
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="item-title">
                      <a href="#" target="_blank">
                        {highlightText(service.title, searchTerm)}
                      </a>
                    </div>
                    <div className="item-title2">
                      <i className="icofont-license"></i>
                      Kiểu dịch vụ: <span className="badge badge-info">{serviceTypes[service.type]}</span>
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
                      <a href="#" className="btn btn-danger">Hide</a>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <div>No services found</div>
          )
        ) : (
          currentItems.map(service => (
            <div className="item-list" key={service._id}>
              <Row>
                <Col md={3}>
                  <div className="featured">Đặc sắc</div>
                  <div className="thumb-image">
                    <a href="#" >
                      <img src={service.thumbnail} className="img-responsive" alt="" />
                    </a>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="item-title">
                    <a href="#">
                      {service.title}
                    </a>
                  </div>
                  <div className="item-title2">
                    <i className="icofont-license"></i>
                    Kiểu dịch vụ: <span className="badge badge-info">{serviceTypes[service.type]}</span>
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
                    <a href="#" className="btn btn-danger">Hide</a>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Row>

    </DashboardTemplate>
  )
}

export default Services