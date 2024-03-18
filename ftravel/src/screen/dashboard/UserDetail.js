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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <DashboardTemplate title="Manage User">
      <div style={{ textAlign: "center" }}>
        <h2>User Profile</h2>
        <div style={{ display: "inline-block" }}>
          <img
            src={userData.avatarIMG}
            alt="User Avatar"
            style={{ display: "block", margin: "0 auto" }}
          />
        </div>
        <div>
          <p>User Name: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Address: {userData.address}</p>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default UserDetail;
