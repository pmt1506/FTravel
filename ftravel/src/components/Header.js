import { Row, Container, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Container className='header-app'>
            <Row>
                <Col xs={6} className="header-left">
                    <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                    <NavLink to={'/tour'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Tours</NavLink>
                </Col>
                <Col xs={6} style={{ textAlign: 'right' }} className="header-right">
                    <NavLink to={'/login'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Login</NavLink>
                    <NavLink to={'/register'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Register</NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;