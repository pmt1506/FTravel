import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../template/DashboardTemplate";
import { toast } from "react-toastify";
import { Button, Row, Table, Modal, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(10);
  const [acceptedReport, setAcceptedReport] = useState(null); // Biến để lưu trữ báo cáo được chấp nhận
  const [showModal, setShowModal] = useState(false); // Biến để xác định trạng thái hiển thị của modal

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:9999/report`)
      .then((res) => res.json())
      .then((data) => {
        // Sắp xếp mảng report sao cho các báo cáo có status là true được đẩy lên đầu
        data.sort((a, b) => {
          return a.status === b.status ? 0 : a.status ? -1 : 1;
        });

        setReport(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleApprove = (id) => {
    const acceptedReport = report.find((report) => report._id === id); // Tìm báo cáo được chấp nhận
    setAcceptedReport(acceptedReport); // Lưu báo cáo được chấp nhận vào state
    setShowModal(true); // Hiển thị modal
  };

  const handleAcceptReport = () => {
    if (acceptedReport) {
      fetch(`http://localhost:9999/report/edit/${acceptedReport._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true }), // Set status for "Processed"
      })
        .then((res) => res.json())
        .then((data) => {
          fetchData();
          setShowModal(false);
          toast.success("Accepted Report!")
        })
        .catch((error) => {
          console.error("Error updating report status:", error);
        });
    }
  };
  const handleCloseModal = () => {
    setShowModal(false); // Ẩn modal nếu bị đóng
  };

  // Tính index bắt đầu của mục đầu tiên trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = report.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <DashboardTemplate title="Manage Report" className="row">
      <Row className="m-3 ml-auto">
        <Col>{/* Action bar */}</Col>
        <Col>
          {/* Phân trang */}
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(report.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#fff" }} className="col-lg-12">
        <Table className="table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th className="col-lg-1">No.</th>
              <th className="col-lg-2">Reporter</th>
              <th className="col-lg-3">Service name</th>
              <th className="col-lg-4">Content</th>
              <th className="col-lg-1">Status</th>
              <th className="col-lg-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((report, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{report.userID.username}</td>
                <td>
                  <Link to={"/detail/" + report.serviceID._id}>
                    {report.serviceID.title}
                  </Link>
                </td>
                {/* Nên có title cho report. Tạo thêm một action view detail - vì khả năng có content dài, 
                khi click vào sẽ hiện popup detail của report 
                Có thể gồm title, service name + type, content chi tiết 
                
                Hoặc hướng khác cho content dài là limit độ dài hiển thị ở bảng VD: "This is example report's cont..."
                Và click detail -> nhảy popup hiện full - rồi làm gì thì hông pit - để đọc thôi ak :vvvv*/}
                <td>{report.content}</td>
                <td
                  style={{
                    fontSize: "0.8rem",
                    color: report.status ? "orange" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {report.status ? "Pending" : "Processed"}
                </td>
                <td>
                  {/* Flow dự tính: khi report mới được tạo thì status là true = Pending
                  Admin accept report thì status sang false = Processed - đặt tên khác thì tùy
                  Reject thì delete thẳng report */}
                  {report.status ? ( // chỉ hiển thị nếu status là true (pending)
                    <>
                      <Button
                        variant="primary"
                        style={{
                          width: "80px",
                          fontSize: "14px",
                          padding: "2px",
                          marginBottom: "1px",
                        }}
                        onClick={() => handleApprove(report._id)}
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
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      {/* Popup */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Acceptance</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to accept this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAcceptReport}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardTemplate>
  );
};
export default Reports;
