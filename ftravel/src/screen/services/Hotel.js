import React, { useEffect, useState } from "react";
import "../../css/services.css";
import TourBanner from "../../components/Tour/TourBanner";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultTemplate from "../../template/DefaultTemplate";

const Hotel = () => {
  const [hotelList, setHotelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState({ field: null, order: 1 }); // Updated state for sorting
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);

  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);

  const hotelListID = "65e2e9c5d9e75d25d6a2b090";
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `http://localhost:9999/service?type=${hotelListID}&page=${currentPage}&pageSize=${pageSize}&sortBy=${
          sortBy.field || ""
        }&order=${sortBy.order}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        // Append region and city to the API URL based on selection
        if (selectedRegion) {
          apiUrl += `&region=${selectedRegion}`;
        }

        if (selectedCity) {
          apiUrl += `&city=${selectedCity}`;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        setHotelList(data.servicesByType);
        const totalItems = data.total;

        const newTotalPages = Math.ceil(totalItems / pageSize);

        setTotalPages(newTotalPages);

        const regions = [
          ...new Set(data.servicesByType.map((hotel) => hotel.region)),
        ];
        setUniqueRegions(regions);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [currentPage, sortBy, minPrice, maxPrice, selectedRegion, selectedCity]);

  // Function to filter cities based on the selected region
  const filterCitiesByRegion = (region) => {
    if (selectedRegion === region) {
      // If the region is already selected, deselect it
      setSelectedRegion(null);
      setFilteredCities([]); // Clear filtered cities
    } else {
      // If a new region is selected, filter cities for that region
      setSelectedRegion(region);
      const citiesInRegion = hotelList
        .filter((hotel) => hotel.region === region)
        .map((hotel) => hotel.city);
      setFilteredCities([...new Set(citiesInRegion)]);
      setSelectedCity(null); // Deselect the city when a new region is selected
    }
  };

  // Function to handle city click, allowing selection and deselection
  const handleCityClick = (city) => {
    if (selectedCity === city) {
      // If the city is already selected, deselect it
      setSelectedCity(null);
    } else {
      // If a new city is selected, update the selected city
      setSelectedCity(city);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSortChange = (field) => {
    // Toggle between ascending (1) and descending (-1) order
    const newOrder = sortBy.field === field ? -sortBy.order : 1;
    setSortBy({ field, order: newOrder });
  };

  // Filter price
  const handlePriceFilterChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  function formatPrice(priceInVND) {
    // Multiply the price by 1000
    const priceInDong = priceInVND * 1000;

    // Format the price with dot separators for thousands
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    // Format the price and add "VND" currency symbol
    const formattedPrice = formatter.format(priceInDong);

    return formattedPrice;
  }

  return (
    <DefaultTemplate>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://png.pngtree.com/png-vector/20190521/ourmid/pngtree-hotel-icon-for-personal-and-commercial-use-png-image_1044892.jpg"
                  alt="Image"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div className="col-9">
                <h3>Khách sạn tốt</h3>
                <p className="text-muted">
                  Trải nghiệm khách sạn cao cấp với ưu đãi tốt
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://www.svgrepo.com/download/6268/money.svg"
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
                  src="https://static.vecteezy.com/system/resources/thumbnail/006/945/522/small/placeholder-premium-icon-sign-symbol-free-vector.jpg"
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
            <h2 className="mb-3 text-center">Khách sạn</h2>
            <div className="row mb-3">
              {/* Region filter */}
              <div className="col-md-6">
                <div className="d-flex region-container">
                  {uniqueRegions.map((region, index) => (
                    <div
                      key={index}
                      className={`region-item ${
                        selectedRegion === region ? "active" : ""
                      }`}
                      onClick={() => filterCitiesByRegion(region)}
                    >
                      {region}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="d-flex">
                    {filteredCities.map((city, index) => (
                      <div
                        key={index}
                        className={`city-item ${
                          selectedCity === city ? "active" : ""
                        }`}
                        onClick={() => handleCityClick(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-end mt-2">
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="priceFilterDropdown">
                    Lọc tầm giá
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handlePriceFilterChange(0, 1000)}
                    >
                      Mặc định
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handlePriceFilterChange(0, 300)}
                    >
                      0 - 300
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handlePriceFilterChange(301, 500)}
                    >
                      301 - 500
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handlePriceFilterChange(501, 700)}
                    >
                      501 - 700
                    </Dropdown.Item>
                    {/* Add more options as needed */}
                  </Dropdown.Menu>
                </Dropdown>
                {/* React Bootstrap dropdown for sorting */}
                <Dropdown className="ml-1">
                  <Dropdown.Toggle variant="secondary" id="sortDropdown">
                    Sắp xếp giá
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={sortBy.field === "price" && sortBy.order === 1}
                      onClick={() => handleSortChange("price")}
                    >
                      Tăng dần
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={sortBy.field === "price" && sortBy.order === -1}
                      onClick={() => handleSortChange("-price")}
                    >
                      Giảm dần
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {hotelList.length === 0 ? (
              <div className="text-center">
                <h3>No hotel available, please stay tune!</h3>
              </div>
            ) : (
              <div className="row">
                {hotelList.map((hotel, index) => (
                  <div className="col-md-3" key={index}>
                    <Link to={`/detail/${hotel._id}`} className="card-link">
                      <div className="card mb-3 d-flex flex-column">
                        <img
                          src={hotel.thumbnail}
                          alt="Tour image"
                          className="card-img-top card-thumbnail"
                        />
                        <div className="card-body d-flex flex-column">
                          <div className="row">
                            <div className="col-12 flex-grow-1">
                              {/* Title */}
                              <h6 className="card-title">{hotel.title}</h6>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div className="pt-2">
                              {/* Price */}
                              <p className="align-middle price">
                                {formatPrice(hotel.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {/* Bootstrap Pagination */}
                {totalPages > 1 && (
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
                              Trang trước
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
                              Trang sau
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
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
    </DefaultTemplate>
  );
};

export default Hotel;
