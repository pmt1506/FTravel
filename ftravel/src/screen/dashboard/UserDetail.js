import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../template/DashboardTemplate";
import { Row } from "react-bootstrap";
import Cookies from "js-cookie"; // Import Cookies library
import { toast } from "react-toastify"; // Import toast from react-toastify

const UserDetail = () => {
  const [userData, setUserData] = useState({});
  //accID lấy từ App.js (cái m truyền vào link)

  const accID = localStorage.getItem("userID");
  const accessToken = Cookies.get("accessToken");
  console.log(accessToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the access token from the cookie

        // Define headers with the access token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(`http://localhost:9999/account/${accID}`, {
          method: "GET",
          headers: headers, // Include headers in the request
        });

        if (!response.ok) {
          const data = await response.json();
          toast.error(data.message); // Display error message using toast
          return;
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data"); // Display generic error message using toast
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

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
