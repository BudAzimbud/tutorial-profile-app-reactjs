import React from 'react'
import { Container, Navbar, Nav, NavDropdown, FormControl } from 'react-bootstrap'
function NavbarHome() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Profile App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Nav>
                    <Nav>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/setting" >
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/login" onClick={(event) => {
                                localStorage.removeItem("profile_id")
                                localStorage.removeItem("profile")
                                localStorage.removeItem("work_experience")
                            }
                            } >
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHome