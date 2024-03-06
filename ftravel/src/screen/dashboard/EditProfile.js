import React, { useState, useEffect } from "react";
import DashboardTemplate from '../../template/DashboardTemplate'
import { Row } from 'react-bootstrap'
import axios from "axios";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        email: "",
        phoneNumber: "",
        password: "",
        accountRole: "",
        avatarIMG: "",
        userName: "",
        verify: false,
        cccd: "",
        address: "",
        status: false,
    });

    useEffect(() => {
        // Gọi API để lấy dữ liệu từ MongoDB
        axios.get("http://localhost:9999/profile/:accID")  // Thay đổi đường dẫn API nếu cần
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []); // useEffect chỉ chạy một lần khi component được mount

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi API để cập nhật dữ liệu lên MongoDB
        axios.put("/api/account", userData)  // Thay đổi đường dẫn API nếu cần
            .then((response) => {
                console.log("User data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    return (
        <DashboardTemplate title="Manage User">
            <Row className="m-3">
                <div>
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Render các trường dữ liệu từ userData */}
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        <br/>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                        />
                        <br/>
                        <label>Avatar:</label>
                        <input
                            type="text"
                            name="avatarIMG"
                            value={userData.avatarIMG}
                            onChange={handleChange}
                        />
                        <br/>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                        />
                        <br/>
                        <label>CCCD:</label>
                        <input
                            type="text"
                            name="cccd"
                            value={userData.cccd}
                            onChange={handleChange}
                        />
                        <br/>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleChange}
                        />

                        <br/>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </Row>
        </DashboardTemplate>
    );
};

export default EditProfile;