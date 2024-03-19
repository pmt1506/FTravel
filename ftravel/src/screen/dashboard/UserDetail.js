import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";
import Cookies from "js-cookie"; // Import Cookies library
import { toast } from "react-toastify"; // Import toast from react-toastify

const UserDetail = () => {
  const [userData, setUserData] = useState({});
  //accID lấy từ App.js (cái m truyền vào link)

  useEffect(() => {
    fetch(`http://localhost:9999/account/}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <DashboardTemplate title="Manage User">
      <Row className="m-3">
        <div
          className="container"
          style={{ alignContent: "center", marginLeft: "300px" }}
        >
          <h2 style={{ textAlign: "center" }}>User Profile</h2>
          <form className="mt-4">
            <p>
              <img
                src={userData.avatarIMG}
                className="img-fluid"
                alt="User Avatar"
              />
            </p>
            <p>User Name: {userData.userName}</p>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Address: {userData.address}</p>
          </form>
        </div>
      </Row>
    </DashboardTemplate>
  );
};

export default UserDetail;
