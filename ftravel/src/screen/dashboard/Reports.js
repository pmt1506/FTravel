import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from 'react-router-dom';


const Reports = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/report`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  return (
    <DashboardTemplate title="Manage Report" className="row">
      <Row className="m-3">
        Action Bar
      </Row>
      <Row style={{ backgroundColor: "#fff" }} className="col-lg-12" >
        <Table className="table-striped table-bordered table-responsive">
          <thead>
            <th className="col-lg-1">No.</th>
            <th className="col-lg-2">Reporter</th>
            <th className="col-lg-3">Service name</th>
            <th className="col-lg-4">Content</th>
            <th className="col-lg-1">Status</th>
            <th className="col-lg-1">Action</th>
          </thead>
          <tbody>
            {report.map((report, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{report.userID.username}</td>
                <td><Link to={"/detail/" + report.serviceID}>{report.serviceID.title}</Link></td>
                {/* Nên có title cho report. Tạo thêm một action view detail - vì khả năng có content dài, 
                khi click vào sẽ hiện popup detail của report 
                Có thể gồm title, service name + type, content chi tiết 
                
                Hoặc hướng khác cho content dài là limit độ dài hiển thị ở bảng VD: "This is example report's cont..."
                Và click detail -> nhảy popup hiện full - rồi làm gì thì hông pit - để đọc thôi ak :vvvv*/}
                <td >{report.content}</td>
                <td style={{ fontSize: "0.8rem", color: report.status ? "orange" : "green", fontWeight: "bold" }}>
                  {report.status ? "Pending" : "Processed"}
                </td>
                <td>
                  {/* Flow dự tính: khi report mới được tạo thì status là true = Pending
                  Admin accept report thì status sang false = Processed - đặt tên khác thì tùy
                  Reject thì delete thẳng report */}
                <Button
                    variant="primary"
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      padding: "2px",
                      margin: "1px",
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  // onClick={() => handleDelete(report._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </DashboardTemplate>
  )
}
export default Reports