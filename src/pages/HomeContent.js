import {Button, Container, Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import '../Styles/HomeContent.css';


function HomeContent() {
    return(
        <div>
            <Container>
                <h3>Please Select an exercise below to get started:</h3>
                <Row className="justify-content-center align-content-stretch home-buttons">
                    <LinkContainer to="/Home/Tracing-Lines">
                        <Button as={Col}>Tracing Lines</Button>
                    </LinkContainer>
                    <LinkContainer to="/Home/Tapping-Circles">
                        <Button as={Col} variant="danger">Tapping Circles</Button>
                    </LinkContainer>
                    <LinkContainer to="/Home/Coloring-an-Image">
                        <Button as={Col} variant="success">Coloring an Image</Button>
                    </LinkContainer>
                </Row>
            </Container>
        </div>
    )
}

export default HomeContent