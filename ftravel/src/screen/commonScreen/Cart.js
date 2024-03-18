import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
// import DefaultTemplate from "../../template/DefaultTemplate";
import DashboardTemplate from "../../template/DashboardTemplate";
const Cart = () => {
  const { userID } = useParams();
  const { serviceID } = useParams();
  const [cart, setCart] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/cart/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setService(data.serviceID);
      });
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:9999/${serviceID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Service deleted successfully");
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <DashboardTemplate>
      <Container fluid>
        <Row>
          <Row style={{ justifyContent: "left !important" }} className="ml-3">
            <a
              href="/"
              style={{ textDecoration: "none", color: "black" }}
              className="fa fa-home"
            >
              <i class="bi bi-house"></i>Home
            </a>
            <i class="bi bi-chevron-compact-right"></i>
            <p>
              <i class="bi bi-cart"></i>Cart
            </p>
          </Row>
          <Row className="ml-3">
            <h2>Shopping Cart</h2>
          </Row>
          <Row style={{ padding: "15px", backgroundColor: "#fff" }}>
            <Table className="table-striped table-bordered table-responsive mt-5">
              <thead>
                <th className="col-md-1">Type</th>
                <th className="col-md-4">Title</th>
                <th className="col-md-3">Start date</th>
                <th className="col-md-1">Slot</th>
                <th className="col-md-1">Price</th>
                <th className="col-md-1">Action</th>
              </thead>
              <tbody>
                <tr key={service._id}>
                  {/* <td>{service.type.serviceName}</td> */}
                  <td>1</td>
                  <td>
                    <Link to={"/detail/" + service._id}>{service.title}</Link>
                  </td>
                  <td>{service.startDate}</td>
                  <td>{service.slot}</td>
                  <td>{service.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      style={{
                        width: "80px",
                        fontSize: "14px",
                        padding: "2px",
                      }}
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      style={{
                        width: "80px",
                        fontSize: "14px",
                        padding: "2px",
                      }}
                    >
                      Book now
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Row>
      </Container>
    </DashboardTemplate>
  );
};

export default Cart;
