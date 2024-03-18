import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";

const Users = () => {
  const [userData, setUserData] = useState({});
  //accID lấy từ App.js (cái m truyền vào link)
  const { accID } = useParams();
  useEffect(() => {
    fetch(`http://localhost:9999/account/${accID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);
  console.log(userData);
  // Fetch user data from your API endpoint

  return (
    <DashboardTemplate title="Manage User">
      <Row className="m-3">
        <div>
          <h1>User Profile</h1>
          <p />
          <img src={userData.avatarIMG} alt="User Avatar" />
          <p>User Name: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Address: {userData.address}</p>
          {/* From tienanh with love */}
          <p></p>
        </div>
      </Row>
    </DashboardTemplate>
  );
};

export default Users;
