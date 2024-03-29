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
import DashboardTemplate from "../../template/DashboardTemplate";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [service, setService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9999/cart/`, {
        credentials: "include",
      });
      const data = await response.json();
      setCart(data);
      const serviceIDs = data.map((cartItem) => cartItem.serviceID).flat();
      setService(serviceIDs);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (serviceID) => {
    try {
      const response = await fetch(`http://localhost:9999/cart/${serviceID}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Service deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const totalPages = Math.ceil(service.length / pageSize);

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentServicePage = service.slice(startIndex, endIndex);

  var startDateStrings = service.map((s) => s.startDate);

  var formattedDates = startDateStrings.map((startDateString) => {
    var startDate = new Date(startDateString);
    var day = startDate.getDate();
    var month = startDate.getMonth() + 1;
    var year = startDate.getFullYear();
    return day + "/" + month + "/" + year;
  });
  const addToBill = async (serviceID, price) => {
    const requestData = {
      serviceID: serviceID,
      price: price,
    };
    try {
      const res = await fetch("http://localhost:9999/bill/add", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        removeFromCart(serviceID);
        toast.success(data.message);
        fetchData();
      } else if (res.status === 401) {
        const data = await res.json();
        toast.error(data.error);
      } else if (res.status === 403) {
        const data = await res.json();
        toast.error(data.message);
      } else {
        const data = await res.json();
        handleDelete(serviceID);
        toast.error(data.error);
        fetchData();
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
  const removeFromCart = async (serviceID) => {
    console.log(serviceID);
    const requestData = {
      serviceID: serviceID,
    };
    try {
      const res = await fetch(`http://localhost:9999/cart/`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else if (res.status === 401) {
        const data = await res.json();
        toast.error(data.error);
      } else if (res.status === 403) {
        const data = await res.json();
        toast.error(data.message);
      } else {
        const data = await res.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <DashboardTemplate>
      <Container fluid>
        <Row style={{ justifyContent: "left !important" }} className="ml-3">
          <a
            href="/"
            style={{ textDecoration: "none", color: "black" }}
            className="fa fa-home"
          >
            <i className="bi bi-house"></i>Home
          </a>
          <i className="bi bi-chevron-compact-right"></i>
          <p>
            <i className="bi bi-cart"></i>Cart
          </p>
        </Row>
        <Row className="ml-3">
          <h2>Shopping Cart</h2>
        </Row>
        <Row style={{ padding: "15px", backgroundColor: "#fff" }}>
          <Table className="table-striped table-bordered table-responsive mt-5">
            <thead>
              <tr>
                <td className="col-md-1">Type</td>
                <td className="col-md-4">Title</td>
                <td className="col-md-3">Start date</td>
                <td className="col-md-1">Slot</td>
                <td className="col-md-1">Price</td>
                <td className="col-md-1">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentServicePage.map((s, index) => (
                <tr key={s._id}>
                  {/* <td>{service.type.serviceName}</td> */}
                  <td>1</td>
                  <td>
                    <Link to={"/detail/" + s._id}>{s.title}</Link>
                  </td>
                  <td>{formattedDates[index]}</td>
                  <td>{s.slot}</td>
                  <td>{s.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      style={{
                        width: "80px",
                        fontSize: "14px",
                        padding: "2px",
                      }}
                      onClick={() => removeFromCart(s._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => addToBill(s._id, s.price)}
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
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="text-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentPage === index + 1
                          ? "primary"
                          : "outline-primary"
                      }
                      className="mx-1"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </td>
              </tr>
            </tfoot>
          </Table>
          <ToastContainer />
        </Row>
      </Container>
    </DashboardTemplate>
  );
};

export default Cart;
