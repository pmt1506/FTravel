import SideBar from "../components/common/Sidebar";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'

import "../css/Dashboard.css";

const DashboardTemplate = ({ className = "", title, children, action }) => {
  return (
    <Row className={className} style={{ width: "100%" }}>
      <Col className="col-md-3">
        <SideBar />
      </Col>
      <Col className="col-md-9 col-sm-8">
        <Row
          className="ml-3"
          style={{ paddingBottom: "15px"}}
        >
          <Col>
          <h2>{title}</h2>
          </Col>
          <Col className="text-right mr-3">{action}</Col>
        </Row>
        <Col className="ml-3">{children}</Col>
      </Col>
    </Row>
  );
};
export default DashboardTemplate;
