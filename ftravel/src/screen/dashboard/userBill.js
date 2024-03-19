import { Button, Row, Table } from "react-bootstrap";
import DashboardTemplate from "../../template/DashboardTemplate";
import { useEffect, useState } from "react";

const UserBill = () => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9999/bill/history/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  var startDateStrings = bills.map((s) => s.serviceID.startDate);

  var formattedDates = startDateStrings.map((startDateString) => {
    var startDate = new Date(startDateString);
    var day = startDate.getDate();
    var month = startDate.getMonth() + 1;
    var year = startDate.getFullYear();
    return day + "/" + month + "/" + year;
  });
  return (
    <DashboardTemplate title={"Bill"}>
      <Row style={{ backgroundColor: "#fff" }} className="col-lg-12">
        <Table className="table-striped table-bordered table-hover table-responsive">
          <thead>
            <tr>
              <th className="col-lg-4">Service name</th>
              <th className="col-lg-2">Price</th>
              <th className="col-lg-3">Date</th>
              <th className="col-lg-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b, i) => (
              <tr key={b._id}>
                <td>{b.serviceID.title}</td>
                <td>{b.serviceID.price} $</td>
                <td>{formattedDates[i]}</td>
                <td>
                  {b.status ? (
                    <Button variant="success">Accepted </Button>
                  ) : (
                    <Button variant="warning">Pending</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </DashboardTemplate>
  );
};

export default UserBill;
