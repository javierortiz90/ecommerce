import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";

import { ItemsContext } from "../contexts/itemsContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const initialValues = {
    phone: "",
    email: "",
    emailConfirm: "",
    name: "",
}

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const [validated, setValidated] = useState(false);

    const {reset, removeItem, items} = useContext(ItemsContext);

    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

    const handleChange = (ev) => {
        setBuyer((prev) => {
            return { ...prev, [ev.target.name]: ev.target.value };
        });
    }

    const handleOrder = () => {
        const order = {
            buyer,
            items,
            total,
        }

        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, order).then(({id}) => {
            if (id) {
                alert("Su orden: " + id + " ha sido completada");
                reset();
                setBuyer(initialValues);
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            handleOrder();
        }
    };

    const emailMatches = buyer.email === buyer.emailConfirm;

    if(items.length === 0)
        return (
            <Container className="py-5 text-center">
                <h2 className="mb-5">Tu carrito se encuentra vacio</h2>
                <Link to={"/"}><Button variant="primary">Buscar productos</Button></Link>
            </Container>
        )

    return (
        <Container>
            <Row>
                <Col md={8} className="p-4">
                    <div className="p-4">
                        <h1>Mi carrito</h1>
                        {items.map((i) =>
                            <div key={i.id}>
                                <Row>
                                    <Col className=''><Image src={i.imageId} thumbnail alt={i.title} /></Col>
                                    <Col className=''><h5>{i.title} ∙ {i.model}</h5> <p>Precio x unidad: ${i.price}<br />Cantidad: {i.quantity}</p></Col>
                                    <Col sm={2} lg={1} className='text-end'><Button variant="outline-danger" onClick={() => removeItem(i.id)}>X</Button></Col>
                                </Row>
                                <hr />
                            </div>
                        )}
                        <Row>
                        <Link to={"/"}><Button className="w-100" variant="outline-primary">Seguir comprando</Button></Link>
                        </Row>
                    </div>
                </Col>
                <Col md={4} className="p-4">
                    <div className="shadow rounded p-4">
                        <h5>Total a pagar</h5>
                        <h2>${total}</h2>
                        <hr />
                        {!!items.length && (
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            value={buyer.name}
                                            onChange={handleChange}
                                            name="name"
                                            required
                                            type="text"
                                            placeholder=""
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, ingrese su nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom03">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            value={buyer.phone}
                                            onChange={handleChange}
                                            name="phone"
                                            type="number"
                                            placeholder=""
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, ingrese un número de teléfono.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="validationCustom04">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            value={buyer.email}
                                            onChange={handleChange}
                                            name="email"
                                            required
                                            type="email"
                                            placeholder=""
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor, ingrese un e-mail válido.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="validationCustom05">
                                        <Form.Label>Repetir e-mail</Form.Label>
                                        <Form.Control
                                            value={buyer.emailConfirm}
                                            onChange={handleChange}
                                            name="emailConfirm"
                                            required
                                            type="email"
                                            placeholder=""
                                            isInvalid={!emailMatches}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="success" type="submit" className="my-4" disabled={!emailMatches}>Comprar</Button>
                                    <Button variant="outline-secondary" onClick={reset}>Vaciar Carrito</Button>

                                </Row>
                            </Form>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
