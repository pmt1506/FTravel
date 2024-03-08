import SideBar from "../components/common/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

import "../css/Dashboard.css";

const DashboardTemplate = ({ className = "", title, children }) => {
  return (
    <Row className={className} style={{ width: "100%" }}>
      <Col className="col-md-3 col-sm-4">
        <SideBar />
      </Col>
      <Col className="col-md-9 col-sm-8">
        <Row
          style={{ justifyContent: "left !important", paddingTop: "10px" }}
          className="ml-3"
        >
          <a
            href="/"
            style={{ textDecoration: "none", color: "black" }}
            className="fa fa-home"
          >
            <i class="bi bi-house"></i>Home
          </a>
          <i class="bi bi-chevron-compact-right"></i>
          <p>{title}</p>
        </Row>
        <Row
          className="ml-3"
          style={{ paddingBottom: "15px", borderBottom: "1px solid #ccc" }}
        >
          <h2>{title}</h2>
        </Row>
        <Row className="ml-3">{children}</Row>
      </Col>
    </Row>
  );
};
export default DashboardTemplate;
