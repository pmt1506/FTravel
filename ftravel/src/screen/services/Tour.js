import React, { useEffect, useState } from "react";
import "../../css/services.css";
import TourBanner from "../../components/Tour/TourBanner";

const Tour = () => {
  const [tourList, setTourList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tourListID = "65e2e9d2d9e75d25d6a2b092";
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/service?type=${tourListID}&page=${currentPage}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTourList(data.servicesByType);
        const totalItems = data.total;
        console.log("Total tour list item count:", totalItems);

        const newTotalPages = Math.ceil(totalItems / pageSize);

        setTotalPages(newTotalPages);
        console.log("Total page: ", newTotalPages);

        console.log("Data: ", data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TourBanner />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/026/641/257/original/user-icon-in-flat-style-person-icon-user-icon-for-web-site-user-icon-illustration-vector.jpg"
                  alt="Image"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div className="col-9">
                <h3>Cộng tác viên</h3>
                <p className="text-muted">
                  Danh sách các cộng tác viên đông đảo tại Ong Vò Vẽ
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/022/267/435/non_2x/verified-person-icon-for-any-purposes-vector.jpg"
                  alt="Image"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div className="col-9">
                <h3>Thanh toán nhanh gọn</h3>
                <p className="text-muted">
                  Thanh toán đơn hàng nhanh chóng và tiện lợi.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/006/945/522/small/placeholder-premium-icon-sign-symbol-free-vector.jpg"
                  alt="Image"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div className="col-9">
                <h3>Địa điểm đa dạng</h3>
                <p className="text-muted">
                  Nhiều địa điểm thú vị đang chờ đón bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2 className="mb-3">Featured Tours</h2>
            {tourList.length === 0 ? (
              <div className="text-center">
                <h3>No tour available, please stay tune!</h3>
              </div>
            ) : (
              <div className="row">
                {tourList.map((tour, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card mb-3 d-flex flex-column">
                      <img
                        src={tour.thumbnail}
                        alt="Tour image"
                        className="card-img-top card-thumbnail"
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="row">
                          <div className="col-12 flex-grow-1">
                            <h5 className="card-title">{tour.title}</h5>
                            <p className="card-text">${tour.price}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary">Buy Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Bootstrap Pagination */}
                <div className="col-12 d-flex justify-content-center">
                  <div className="text-center">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li
                            key={i + 1}
                            className={`page-item ${
                              currentPage === i + 1 && "active"
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="container mt-2"
        style={{ background: "#f6b756", padding: "20px" }}
      >
        <div className="row">
          <div className="col">
            <div className="row" style={{ padding: "40px 45px 50px" }}>
              <div className="col-md-8">
                <h1
                  style={{
                    lineHeight: "60px",
                    fontSize: "48px",
                    fontWeight: "500",
                  }}
                >
                  Bạn có yêu thích địa điểm của bạn không ?
                </h1>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-more"
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    float: "right",
                    background: "#fff",
                    color: "#000",
                    padding: "15px 25px",
                    fontWeight: "500",
                    borderRadius: "5px",
                    transition: "all 0.3s",
                  }}
                >
                  Đăng ký cộng tác viên của FTravel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tour;
