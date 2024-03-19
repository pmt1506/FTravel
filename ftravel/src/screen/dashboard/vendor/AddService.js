import { Button, Col, Form, Row } from "react-bootstrap";
import DashboardTemplate from "../../../template/DashboardTemplate";

const AddService = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/bill/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Additional logic to handle successful login, such as setting user session
      } else {
        const data = await response.json();
        alert(data.error);
        // Additional logic to handle login failure, such as displaying an error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Additional error handling logic
    }
  };
  return (
    <DashboardTemplate title={"Create service"}>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            // onChange={(e) => {
            //   setEmail(e.target.value);
            // }}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
            required
          />
        </Form.Group>
        <Form.Group controlId="rePassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            // onChange={(e) => {
            //   setRePassword(e.target.value);
            // }}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            {" "}
            <Form.Group controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                // onChange={(e) => {
                //   setUserName(e.target.value);
                // }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                // onChange={(e) => {
                //   setPhoneNumber(e.target.value);
                // }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />

        <Row className="justify-content-center">
          <div>
            <Button className="btn-btn-success" type="submit">
              Create
            </Button>
          </div>
        </Row>
      </Form>
    </DashboardTemplate>
  );
};

export default AddService;
