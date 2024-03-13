import { Container, Row } from "react-bootstrap";
import "../../css/sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar" style={{ background: "#1a2b47"}}>
      <div className="logo">
        <Row className="justify-content-center ">
          <div className="avatar">
            <img src="#"></img>
          </div>
        </Row>
      </div>
      <Row className="justify-content-center">
        <div className="info">
          <span className="badge badge-info">Customer</span>
          <h5 style={{ fontSize: "16px", padding: "2px", color: "white" }}>
            Thanh Minh
          </h5>
          <p
            style={{
              marginBottom: "5px",
              lineHeight: "15px",
              fontSize: "10px",
              color: "white",
            }}
          >
            Thanh vien ke tu 2023
          </p>
        </div>
      </Row>
      <Row>
        <div className="user-plan">
          <a href="#">Become a vendor</a>
        </div>
      </Row>
      <Row className="list">
        <div className="sidebar-menu">
          <ul className="main-menu">
            {/* Admin */}
            <li><Link to="/admin/service"><i className="bi bi-wallet"></i> Manage Services</Link></li>
            <li><Link to="/admin/user"><i className="bi bi-wallet"></i> Manage Users</Link></li>
            <li><Link to="/admin/report"><i className="bi bi-wallet"></i> Manage Reports</Link></li>
            {/* End */}

            {/* Vendor */}
            <li><Link to="/vendor/service"><i className="bi bi-wallet"></i> Manage Services - Ven</Link></li>
            {/* End */}

            {/* <li><a href="#"><i className="bi bi-clock-history"></i> Booking history</a></li>
                        <li><a href="#"><i className="bi bi-heart-fill"></i> Wish list</a></li>
                        <li><a href="#"><i className="bi bi-wallet"></i> My wallet</a></li>
                        <li><a href="#"><i className="bi bi-cart3"></i> Cart</a></li> */}
            <li>
              <a href="#">
                <i className="bi bi-person-circle"></i> User profile
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-key"></i> Change password
              </a>
            </li>
          </ul>
        </div>
      </Row>

      <Row className="list">
        <div className="logout">
          <a href="#">
            <i className="bi bi-box-arrow-left"></i> Log out
          </a>
        </div>
      </Row>
      <Row className="list">
        <div className="logout">
          <a href="/">
            <i className="bi bi-house"></i> Back to homepage
          </a>
        </div>
      </Row>
    </div>
  );
};

export default SideBar;
