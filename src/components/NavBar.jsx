import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { CartWidget } from "./CartWidget";

function NavBar() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="/">E-commerce Autos</Navbar.Brand>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/category/sedan">Sedan</Nav.Link>
            <Nav.Link as={NavLink} to="/category/suv">SUV</Nav.Link>
            <Nav.Link as={NavLink} to="/category/camioneta">Camioneta</Nav.Link>
            <Nav.Link as={NavLink} to="/category/deportivo">Deportivo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;
