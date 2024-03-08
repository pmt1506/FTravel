import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
// import SideBar from "../components/Sidebar";
// import DefaultTemplate from "../../template/DefaultTemplate";
import DashboardTemplate from "../../template/DashboardTemplate";

const Booking = () => {
  return (
    <DashboardTemplate>
      <Container fluid>
        <Row>
          <Row>
            {/* <ul style={{ padding: "10px 16px", listStyle: "none", backgroundColor: "#eee", display: "inline" }}>
                    <li><a href="/" style={{ textDecoration: "none", color: "black" }} className="fa fa-home">
                        <i class="bi bi-house"></i> Home</a>
                        <i class="bi bi-chevron-compact-right"></i>
                    </li>
                    <li><p><i class="bi bi-cart"></i> Cart</p></li>
                </ul> */}
            <a
              href="/"
              style={{ textDecoration: "none", color: "black" }}
              className="fa fa-home"
            >
              <i class="bi bi-house"></i> Home
            </a>
            <i class="bi bi-chevron-compact-right"></i>
            <p>
              <i class="bi bi-cart"></i> Booking
            </p>
          </Row>
          <Row>
            <h2>Booking history</h2>
          </Row>
          <Row style={{ padding: "15px", backgroundColor: "#fff" }}>
            <Table className="table-striped table-bordered table-responsive mt-5">
              <thead>
                <th className="col-md-1">Type</th>
                <th className="col-md-4">Title</th>
                <th className="col-md-3">Start date</th>
                <th className="col-md-1">Slot</th>
                <th className="col-md-1">Price</th>
              </thead>
              <tbody>
                <tr>
                  <td>Tour</td>
                  <td>This tour is for couples</td>
                  <td>22/03/2344</td>
                  <td>1</td>
                  <td>200000VND</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Row>
      </Container>
    </DashboardTemplate>
  );
};
export default Booking;
