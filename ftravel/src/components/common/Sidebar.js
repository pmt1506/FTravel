import { Container, Row } from "react-bootstrap";
import "../../css/sidebar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  useEffect(() => {
    fetch(`http://localhost:9999/account/}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setRole(data.accountRole.roleName);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <div className="sidebar" style={{ background: "#1a2b47" }}>
      <div className="logo">
        <Row className="justify-content-center ">
          <div className="avatar">
            <img src={user.avatarIMG} />
          </div>
        </Row>
      </div>
      <Row className="justify-content-center">
        <div className="info">
          <span className="badge badge-info">{role}</span>
          <h5 style={{ fontSize: "16px", padding: "2px", color: "white" }}>
            {user.userName}
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
            {role === "Admin" ? (
              <>
                {" "}
                <li>
                  <Link to="/admin/service">
                    <i className="bi bi-wallet"></i> Manage Services
                  </Link>
                </li>
                <li>
                  <Link to="/admin/user">
                    <i className="bi bi-wallet"></i> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/admin/report">
                    <i className="bi bi-wallet"></i> Manage Reports
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            {/* End */}
            {role === "endor" ? (
              <>
                {" "}
                <li>
                  <Link to="/vendor/service">
                    <i className="bi bi-wallet"></i> Manage Services - Ven
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/bill">
                    <i className="bi bi-wallet"></i> Manage Bill{" "}
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {/* Vendor */}

            {/* End */}

            {/* <li><a href="#"><i className="bi bi-clock-history"></i> Booking history</a></li>
                        <li><a href="#"><i className="bi bi-heart-fill"></i> Wish list</a></li>
                        <li><a href="#"><i className="bi bi-wallet"></i> My wallet</a></li>
                        <li><a href="#"><i className="bi bi-cart3"></i> Cart</a></li> */}
            {role === "Customer" ? (
              <>
                {" "}
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
              </>
            ) : (
              <></>
            )}
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
