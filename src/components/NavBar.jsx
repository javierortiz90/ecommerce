import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.svg'

import { CartWidget } from "./CartWidget";
import { FavWidget } from './FavWidget';
import { SearchWidget } from './SearchWidget';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img
              alt=""
              src={logo}
              width=""
              height="30"
              className="d-inline-block align-top"
            />{' '}
            E-commerce Autos
          </Navbar.Brand>
          <Nav className="mx-auto gap-3">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/category/sedan">Sedan</Nav.Link>
            <Nav.Link as={NavLink} to="/category/suv">SUV</Nav.Link>
            <Nav.Link as={NavLink} to="/category/camioneta">Camioneta</Nav.Link>
            <Nav.Link as={NavLink} to="/category/deportivo">Deportivo</Nav.Link>

          </Nav>
          <SearchWidget />
          <FavWidget />
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
