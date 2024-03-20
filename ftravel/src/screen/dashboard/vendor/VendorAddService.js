import React, { useState, useEffect } from "react";
import DashboardTemplate from "../../../template/DashboardTemplate";
import { Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";

import { regions } from "../../../components/common/regions.js";

const VendorAddService = () => {
  // Get the current date
  const currentDate = new Date().toISOString().split("T")[0];

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [thumbnails, setThumbnails] = useState([]); // State variable for multiple thumbnails base64 strings
  const [slot, setSlot] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [accountID, setAccountID] = useState("");
  const [startDate, setStartDate] = useState(currentDate); // Set the default start date to the current date
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]); // State variable for storing types fetched from API
  const [selectedRegion, setSelectedRegion] = useState(""); // State variable for selected region
  const [citiesByRegion, setCitiesByRegion] = useState([]); // State variable for cities filtered by region

  const [userData, setUserData] = useState({});

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/account/}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setAccountID(data._id);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Function to fetch types from API
  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:9999/type");
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  // Fetch types from API on component mount
  useEffect(() => {
    fetchTypes();
    console.log(regions);
  }, []);

  // Function to handle file change event for thumbnail upload
  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files); // Get all selected files

    // Convert selected images to base64 format
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64 = reader.result; // Get the base64 representation
            console.log("Base64 representation:", base64); // Log the base64 representation
            resolve(base64);
          };
          reader.onerror = (error) => reject(error);
        });
      })
    )
      .then((base64Thumbnails) => {
        setThumbnails(base64Thumbnails); // Set thumbnails state as an array of base64 strings
      })
      .catch((error) => {
        console.error("Error converting thumbnails to base64:", error);
      });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9999/service/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          thumbnails,
          slot,
          price,
          description,
          startDate,
          endDate,
          region, // Ensure region state is included in the request body
          city,
          type,
          accountID,
        }),
      });

      if (response.ok) {
        console.log("Service added successfully!");
        // Reset form fields and thumbnails state
        setTitle("");
        setThumbnails([]);
        setSlot("");
        setPrice("");
        setDescription("");
        setStartDate(currentDate);
        setEndDate("");
        setRegion(""); // Reset region state
        setCity("");
        setType("");
      } else {
        console.error("Failed to add service:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }

    // Log form data after submit
    console.log("Form data after submit:", {
      title,
      thumbnails,
      slot,
      price,
      description,
      startDate,
      endDate,
      region,
      city,
      type,
      accountID,
    });
  };

  // Function to handle region change
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion); // Update selectedRegion state with the selected value
    setRegion(selectedRegion); // Update region state with the selected value

    // Filter cities based on the selected region
    const cities = regions.find(
      (region) => region.name === selectedRegion
    )?.cities;
    setCitiesByRegion(cities || []);
  };

  // Function to handle price change and generate suggestions
  const handlePriceChange = (e) => {
    const inputPrice = parseInt(e.target.value);
    if (!isNaN(inputPrice)) {
      // Check if inputPrice is a valid number
      const formattedPrice = inputPrice.toLocaleString("vi-VN"); // Format input as currency
      setPrice(inputPrice); // Update price state with input value

      // Generate suggestions based on the input price
      const multipliers = [1000, 10000, 100000];
      const generatedSuggestions = multipliers.map((multiplier) => {
        const suggestion = inputPrice * multiplier;
        return suggestion.toLocaleString("vi-VN"); // Format suggestion as currency
      });

      setSuggestions(generatedSuggestions); // Update suggestions state
    } else {
      setPrice(""); // Reset price state if input is not a valid number
      setSuggestions([]); // Clear suggestions
    }
  };

  // Function to set the price when a suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    setPrice(parseInt(suggestion.replace(/\D/g, ""))); // Extract the numeric value from the suggestion and set as price
  };

  return (
    <DashboardTemplate title="Add service">
      <div>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tiêu đề"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Loại dịch vụ</label>
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Chọn dịch vụ</option>
                  {types.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.serviceName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  min={currentDate} // Set the minimum date to the current date
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    // Set the minimum value of End Date to the selected Start Date
                    setEndDate(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  min={startDate} // Set the minimum date to the selected Start Date
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label>Vùng miền</label>
                <select
                  className="form-control"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="">Chọn vùng miền</option>
                  {regions.map((region) => (
                    <option key={region.name} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Thành phố</label>
                <select
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Chọn thành phố</option>
                  {citiesByRegion.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Số lượng người</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập số lượng người"
                  value={slot}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0 || e.target.value === "") {
                      // Check if value is greater than 0 or empty
                      setSlot(value);
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label>Giá tiền(VND)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập giá tiền"
                  value={price}
                  onChange={handlePriceChange} // Handle price change event
                  min={1}
                />
              </div>
              <div className="d-flex">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="border rounded mr-1"
                    style={{ cursor: "pointer", padding: "3px 6px " }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <label>Chi tiết</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>
          <div className="form-group">
            <label>Chọn ảnh dịch vụ</label>
            <input
              type="file"
              className="form-control"
              onChange={handleThumbnailChange} // Handle file change event for thumbnails
              multiple // Allow multiple file selection
              accept="image/*" // Accept only image files
            />
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  marginTop: "10px",
                  maxWidth: "300px",
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Thêm dịch vụ
          </button>
        </form>
      </div>
    </DashboardTemplate>
  );
};

export default VendorAddService;
