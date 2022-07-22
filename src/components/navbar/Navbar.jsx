import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/pokemon-logo.png'

export default function AppNavbar() {
    return (
        <Navbar bg="light" expand="lg" sticky='top'>
            <Container>
                <Navbar.Brand href="/" >
                    <img
                        src={logo}
                        alt="logo"
                        height={50}
                        className="d-inline-block align-center"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/favorites">Favorites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
