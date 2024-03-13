
import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../../template/DashboardTemplate'
import { Col, Form, FormCheck, Row } from 'react-bootstrap'
import '../../../css/DashboardServices.css'

const VendorServices = () => {
  const [servicesByVendor, setservicesByVendor] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [serviceTypes, setServiceTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  useEffect(() => {
    const results = servicesByVendor.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Apply filter by type if a type is selected
    if (selectedType !== '') {
      setSearchResults(results.filter(service => service.type._id === selectedType));
    } else {
      setSearchResults(results);
    }
  }, [searchTerm, servicesByVendor, selectedType]);

  const accountID = "65e33ed3eb4daa89c995957f"
  const fetchData = () => {
    fetch(`http://localhost:9999/service/vendor?accountID=${accountID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setservicesByVendor(data.servicesByVendor);
      });

    // Fetch service types
    fetch(`http://localhost:9999/type`)
      .then((res) => res.json())
      .then((data) => {
        setServiceTypes(data);
      });
  };

  // Tính index bắt đầu của mục đầu tiên trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = servicesByVendor.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleDropdownChange = (e) => {
    setSelectedType(e.target.value);
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
      <Row className="m-3 ml-auto w-100">
        <Col md={4}>
          <Form.Group className="row">
            <Form.Control as="select" value={selectedType} onChange={handleDropdownChange}>
              <option value="">All Services</option>
              {serviceTypes && serviceTypes.map((type, index) => (
                <option key={index} value={type._id}>{type.serviceName}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Control style={{ width: "20rem" }}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {/* <Button onClick={handleSearch}>Search</Button> */}
        </Col>
        <Col md={4}>
          <ul className="pagination">
            {Array.from({ length: Math.ceil((searchTerm ? searchResults.length : servicesByVendor.length) / itemsPerPage) }).map((_, index) => (
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
        {searchTerm || selectedType ? (
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
                      Kiểu dịch vụ: <span className="badge badge-info">{service.type.serviceName}</span>
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
                    Kiểu dịch vụ: <span className="badge badge-info">{service.type.serviceName}</span>
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

export default VendorServices;