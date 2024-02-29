import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../css/services.css";

const Tour = () => {
  const [tourList, setTourList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const tourListID = "65d440dd4ba915fa5c498398";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/service", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify({
            // Add your request payload here
            type: tourListID,
            pageSize: 8,
            page: currentPage,
          }),
        });

        if (response.status === 200) {
          // Handle the successful response
          const data = await response.json();
          setTourList(data.allServices);
        } else if (response.status === 404) {
          // Handle other status codes if needed
          console.error("Non-OK status:", response.status);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchTourCount = async () => {
      try {
        const response = await fetch("http://localhost:9999/service/count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify({
            // Add your request payload here
            type: tourListID,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          const totalItems = data.total;
          const pageSize = 8; // Set your desired page size
          const calculatedTotalPages = Math.ceil(totalItems / pageSize);

          setTotalPages(calculatedTotalPages);
          console.log(calculatedTotalPages);
        } else if (response.status === 404) {
          // Handle other status codes if needed
          console.error("Non-OK status:", response.status);
          setTotalPages(0);
          setTourList([]);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchTourCount();
  }, []);

  const placeholderImages = [
    "https://images.pexels.com/photos/13588741/pexels-photo-13588741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/626749/pexels-photo-626749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/629167/pexels-photo-629167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/458917/pexels-photo-458917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12485969/pexels-photo-12485969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12360777/pexels-photo-12360777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/449283/pexels-photo-449283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "linear",
  };

  // Constant demo rating value
  const demoRating = 4;

  // Function to generate stars based on the demo rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= demoRating ? "filled" : "unfilled"}`}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <Slider {...settings}>
              {placeholderImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`slide ${index + 1}`}
                    className="img-fluid"
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
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
            <div className="row">
              {tourList.map((tour, index) => (
                <div className="col-md-3 " key={index}>
                  <div className="card mb-3">
                    <img
                      src={tour.thumbnail}
                      alt="Tour image"
                      className="card-img-top"
                    />
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{tour.title}</h5>
                        <p className="card-text">${tour.price}</p>
                        <div className="stars-container">{renderStars()}</div>
                      </div>
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-12 mt-2">
                {/* Pagination */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        tabIndex="-1"
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
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
