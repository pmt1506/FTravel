import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import '../css/VendorList.css'

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    // const VendorID = "65eca55244f51d8ce7092543";

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch("http://localhost:9999/account/all");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data)
                const filteredVendors = data.filter(vendor => vendor.accountRole && vendor.accountRole.roleName === "vendor");
                setVendors(filteredVendors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVendors();
    }, []);
    return (
        <Container>
            <h1>Những nhà cung cấp tốt nhất tại FTravel</h1>

            <Row className="item">
            {vendors.map(vendor => (
                <Col lg={3} md={6} sm={6} xs={12}>
                    <Card className="vendor-card" style={{ width: '18rem' }}>
                        <div className="d-flex justify-content-center">
                            <Card.Img src={vendor.avatarIMG} alt="Vân Lê Khánh" className="centered-img" />
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title>{vendor.username}</Card.Title>
                            <Card.Text className="role">
                               Address: {vendor.address}
                            </Card.Text>
                            <Button className="primary">Xem lí lịch</Button>
                        </Card.Body>
                    </Card>
                </Col>
               ))} 
            </Row>
        </Container>
    );
};

export default VendorList;
