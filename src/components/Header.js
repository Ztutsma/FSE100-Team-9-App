import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function Header() {
    return(
        <header>
            <h1>FMS Logo</h1>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/Home">Home</Navbar.Brand>
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