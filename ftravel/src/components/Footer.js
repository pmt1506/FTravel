import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <Row className='header-app fixed-bottom'>
            <Container className='footer-component'>
                <Row>
                    <Col xs={12}>
                        @Copyright by Group 3
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}

export default Footer;