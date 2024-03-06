import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import { Row } from 'react-bootstrap'
import axios from 'axios';

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from your API endpoint
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/account/:accID'); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardTemplate title="Manage User">
      <Row className="m-3">
        <div>
          <h1>User Profile</h1>
          <p/><img src={userData.avatarIMG} alt="User Avatar" />
          <p>User Name: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Address: {userData.address}</p>
          <p></p>
        </div>
      </Row>
    </DashboardTemplate>
  )
}

export default Users;