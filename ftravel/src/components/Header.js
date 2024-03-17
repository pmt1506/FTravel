import React, { useState } from 'react';
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Here you can implement the logic to fetch data using the searchTerm
        console.log('Search term:', event.target.value);
    };

    return (
        <Container className='header-app'>
            <Row>
                <Col xs={3} className="header-left">
                    <NavLink to={'/'} className="d-flex align-items-center" style={{ textDecoration: "none" }}>
                        <img src={logo} alt="logo" width={100} height={100} />
                        <h1>FTravel</h1>
                    </NavLink>
                </Col>
                <Col xs={5} className="mt-4 justify-content-center align-items-center">
                    <div className="search-form">
                        <Form.Control 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </Col>
                <Col xs={4} md={3} style={{ textAlign: 'right', marginTop: "30px" }} className="header-right">
                    <NavLink to={'/login'} className="align-items-center">
                        <Button variant="outline-primary" className="mx-2">Login</Button>
                    </NavLink>
                    <NavLink to={'/register'} className="align-items-center">
                        <Button variant="outline-success">Register</Button>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
