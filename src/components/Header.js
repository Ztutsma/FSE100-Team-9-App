import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./../Styles/Header.css";

function Header() {
    return(
        <header>
            <div id="logo-header">
                <h1>Improve your child's fine motor skills!</h1>
            </div>
            <Navbar bg="light" className="header-navbar">
                <Container>
                    <LinkContainer to="/Home">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to="/Home/Tracing-Lines">
                                <Nav.Link>Tracing Lines</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Home/Tapping-Circles">
                                <Nav.Link>Tapping Circles</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Home/Coloring-an-Image">
                                <Nav.Link>Coloring an Image</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header