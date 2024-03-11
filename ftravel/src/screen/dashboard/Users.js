import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import DashboardTemplate from '../../template/DashboardTemplate'
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
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
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  return (
    <DashboardTemplate title="Manage User" className="row">
      <Row className="m-3">
        Action Bar
      </Row>
      <Row style={{ backgroundColor: "#fff" }} className="col-lg-12" >
        <Table className="table-striped table-bordered table-responsive">
          <thead>
            <th className="col-lg-1">No.</th>
            <th className="col-lg-2">Name</th>
            <th className="col-lg-4">Email</th>
            <th className="col-lg-2">Role</th>
            <th className="col-lg-2">Status</th>
            <th className="col-lg-2">Action</th>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* Lam thi de y */}
                  {/* <Link to={"detail/" + user._id}>{user.username}</Link> */}
                  <Link to={"detail/"}>{user.username}</Link>
                </td>
                <td>{user.email}</td>
                <td style={{ fontSize: "0.8rem" }} >{user.accountRole?.roleName}</td>
                <td style={{ fontSize: "0.8rem", color: user.status ? "green" : "red", fontWeight: "bold" }}>
                  {user.status ? "Active" : "Banned"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  // onClick={() => handleDelete(user._id)}
                  >
                    Delete
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