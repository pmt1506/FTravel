import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";

const UserDetail = () => {
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
        <div className="container" style={{ alignContent: "center", marginLeft: "300px" }}>
          <h2 style={{ textAlign: "center" }}>User Profile</h2>
          <form className="mt-4">
            <p>
              <img src={userData.avatarIMG}
               className="img-fluid"
               alt="User Avatar" />
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
