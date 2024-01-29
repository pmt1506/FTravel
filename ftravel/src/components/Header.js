import { Row, Container, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Row className='header-app'>
            <Container>
                <Row>
                    <Col xs={6} className="header-left">
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Tours</NavLink>
                    </Col>
                    <Col xs={6} style={{ textAlign: 'right' }} className="header-right">
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Login</NavLink>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Register</NavLink>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}

export default Header;