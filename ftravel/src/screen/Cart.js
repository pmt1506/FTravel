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
        <Container className="container-fluid col-lg-8">
            <Row>
                <a href="/" style={{ textDecoration: "none", color: "black" }} className="fa fa-home">
                    <i class="bi bi-house"></i>Home</a>
                <i class="bi bi-chevron-compact-right"></i>
                <p><i class="bi bi-cart"></i>Cart</p>
            </Row>
            <Row>
                <h2>Shopping Cart</h2>
            </Row>
            <Row style={{ padding: "15px", backgroundColor: "#fff" }}>
                <Table className="table-striped table-bordered table-responsive mt-5">
                    <thead>
                        <th className="col-md-1">Type</th>
                        <th className="col-md-4">Title</th>
                        <th className="col-md-3">Start date</th>
                        <th className="col-md-1">Slot</th>
                        <th className="col-md-1">Price</th>
                        <th className="col-md-2">Action</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tour</td>
                            <td>This tour is for fvking loser</td>
                            <td>22/03/2344</td>
                            <td>1</td>
                            <td>200000VND</td>
                            <td>
                                <Button className="btn-danger" style={{ width: "80px", fontSize: "14px", padding: "2px" }}>Delete</Button>
                                <Button className="btn-primary" style={{ width: "80px", fontSize: "14px", padding: "2px" }}>Buy</Button>

                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container >
    )
}

export default Cart