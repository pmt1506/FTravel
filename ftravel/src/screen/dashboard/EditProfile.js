import React, { useState, useEffect } from "react";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    phoneNumber: "",
    avatarIMG: "",
    userName: "",
    address: "",
  });

  useEffect(() => {
    fetch(`http://localhost:9999/account/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9999/account/profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch (error) {
      alert("An error occurred while updating the profile.");
      console.error(error);
    }
  };

  return (
    <DashboardTemplate title="Edit Profile">
      <Row className="m-3">
        <div>
          <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                style={{ width: "350px" }}
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                style={{ width: "350px" }}
                value={userData.userName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                style={{ width: "350px" }}
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </form>
        </div>
      </Row>
    </DashboardTemplate>
  );
};

export default EditProfile;
