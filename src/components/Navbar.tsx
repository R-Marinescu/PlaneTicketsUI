import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import '../css/Navbar.module.css';

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => { 
    return (
        <BootstrapNavbar sticky="top" className="shadow-sm bg-white mb-4">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">Home</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="navbarNav"/>
                <BootstrapNavbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/user-me">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/About">About</Nav.Link>
                        { isLoggedIn && (
                            <Nav.Link as="button" className="btn btn-link" onClick={handleLogout}>Logout</Nav.Link>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}

export default Navbar;