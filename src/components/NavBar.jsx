import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/logo.svg'

import { CartWidget } from "./CartWidget";
import { FavWidget } from './FavWidget';
import { SearchWidget } from './SearchWidget';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width=""
              height="30"
              className="d-inline-block align-top"
            />{' '}
            E-commerce Deporte
          </Navbar.Brand>
          <Nav className="mx-auto gap-3">
            <Nav.Link href="#">Categorias</Nav.Link>
            <Nav.Link href="#" className='active'>Lanzamientos</Nav.Link>
            <Nav.Link href="#">Marcas</Nav.Link>
            <Nav.Link href="#">Deporte</Nav.Link>
            <Nav.Link href="#">Moda</Nav.Link>
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
