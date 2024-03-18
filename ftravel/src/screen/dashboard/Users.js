import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import DashboardTemplate from '../../template/DashboardTemplate'
import {
  Button,
  Row,
  Table,
} from "react-bootstrap";


const Users = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/account/all`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  const handleStatusUpdate = (userID, newStatus) => {
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      fetch(`http://localhost:9999/account/accStatus/${userID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse response body as JSON
        })
        .then(updatedUser => {
          // Update the user's status in the state based on the response from the server
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user._id === updatedUser._id) {
                return updatedUser;
              }
              return user;
            });
          });
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    }
  };


  return (
    <DashboardTemplate title="Manage User" className="row">
      <Row className="m-3">
        Action Bar
      </Row>
      <Row style={{ backgroundColor: "#fff" }} className="col-lg-12" >
        <Table className="table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th className="col-lg-1">No.</th>
              <th className="col-lg-2">Name</th>
              <th className="col-lg-4">Email</th>
              <th className="col-lg-2">Role</th>
              <th className="col-lg-2">Status</th>
              <th className="col-lg-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((currentUser, index) => (
              <tr key={currentUser._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={'detail/'}>{currentUser.username}</Link>
                </td>
                <td>{currentUser.email}</td>
                <td style={{ fontSize: '0.8rem' }}>{currentUser.accountRole?.roleName}</td>
                <td style={{ fontSize: '0.8rem', color: currentUser.status ? 'green' : 'red', fontWeight: 'bold' }}>
                  {currentUser.status ? 'Active' : 'Banned'}
                </td>
                <td>
                  <Button
                    variant="danger"
                    style={{ width: '80px', fontSize: '14px', padding: '2px' }}
                    onClick={() => handleStatusUpdate(currentUser._id, currentUser.status)}>
                    {currentUser.status ? 'Ban' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </DashboardTemplate>
  )
}

export default Users