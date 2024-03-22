import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    currP: "",
    newP: "",
    reNNewP: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9999/account/password/`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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
  console.log(userData);
  return (
    <DashboardTemplate title="Manage User">
      <Row className="m-3">
        <div
          className="container"
          style={{ alignContent: "center", marginLeft: "225px" }}
        >
          <h2 style={{ textAlign: "center" }}>Change password</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current password</label>
              <input
                type="password"
                name="currP"
                className="form-control"
                style={{ width: "350px" }}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>New password</label>
              <input
                type="password"
                name="newP"
                className="form-control"
                style={{ width: "350px" }}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm new password</label>
              <input
                type="password"
                name="reNewP"
                className="form-control"
                style={{ width: "350px" }}
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

export default ProfileForm;
