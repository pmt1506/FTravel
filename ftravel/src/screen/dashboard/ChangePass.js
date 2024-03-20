import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardTemplate from '../../template/DashboardTemplate';
import { Row } from 'react-bootstrap';

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    password: '',
  });

  const { accID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9999/account/${accID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [accID]);
  console.log(setUserData);

  const handleChange = (e) => {
    setUserData({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9999/account/password/${accID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.message);
      } else {
        const data = await response.json();
        alert(data.error);
      }

    } catch (error) {
      alert('An error occurred while updating the profile.');
      console.error(error);
    }
  };

  return (
    <DashboardTemplate title="Manage User">
      <Row className="m-3">
        <div className="container" style={{ alignContent: "center", marginLeft: "225px" }}>
          <h2 style={{ textAlign: "center" }}>Đổi mật khẩu</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mật khẩu hiện tại</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={{ width: "350px" }}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={{ width: "350px" }}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={{ width: "350px" }}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">Lưu</button>
          </form>
        </div>
      </Row>
    </DashboardTemplate>
  );
};

export default ProfileForm;
