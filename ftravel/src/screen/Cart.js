import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap"

const Cart = () => {
    const { userId } = useParams();
    const [cart, setCart] = useState([]);
    const [service, setService] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/cart`)
            .then((res) => res.json())
            .then((data) => {
                setCart(data)
                setService(data.serviceID)
            })
    }, []);

    return (
        <Container>
            <Row>
                <p>Hello</p>
            </Row>
        </Container>
    )
}

export default Cart