import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Hospital-Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex justify-between">
                            <div className='flex'>
                                <Nav.Link href="">Add Department</Nav.Link>
                                <Nav.Link href="">Add Employee</Nav.Link>
                            </div>
                            <div className='flex justify-end'>
                                <Nav.Link href="">Logout</Nav.Link>

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header