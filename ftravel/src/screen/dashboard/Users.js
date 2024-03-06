import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../template/DashboardTemplate'
import { Row } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Users = () => {
  const [userData, setUserData] = useState({});
  const {accID} = useParams();

  useEffect(() => {
    // Fetch user data from your API endpoint
    const fetchUserData = async () => {
      try {
        fetch(`http://localhost:9999/account/${accID}`).then; // Replace with your API endpoint
        setUserData(response.json().data);
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
          {/* From tienanh with love */}
          <p></p>
        </div>
      </Row>
    </DashboardTemplate>
  )
}

export default Users;



