import { Row, Container, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Home = () => {
    <NavLink to={'/cart'} className="align-items-center">
        <Button variant="outline-success">Cart</Button>
    </NavLink>
}