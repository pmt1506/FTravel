import { Row, Container, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

const Header = () => {
    return (
        <Container className='header-app'>
            <Row>
                <Col xs={3} className="header-left">
                    <NavLink to={'/'} className="d-flex align-items-center" style={{ textDecoration: "none" }}>
                        <img src={logo} alt="logo" width={100} height={100} />
                        <h1>FTravel</h1>
                    </NavLink>
                </Col>
                <Col xs={9} style={{ textAlign: 'right', marginTop: "30px" }} className="header-right">
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