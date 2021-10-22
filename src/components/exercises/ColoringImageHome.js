import ColoringImageExercise from "./ColoringImageExercise";
import {Col, Container, Row, Button, Accordion} from "react-bootstrap";


function ColoringAnImageHome() {

    const handleClick = () =>{
        document.getElementById("exercise-info").hidden = true;
        document.getElementById("exercise").hidden = false;
        document.getElementById("hidden-exercise-rules").hidden = false;
    }

    return(
        <div>
            <Container>
                <div className="exercise-header">
                    <h2>Coloring an Image</h2>
                    <div id="exercise-info">
                        <p>Rules of the exercise:</p>
                        <Row>
                            <Col></Col>
                            <Col>
                                <ol className="exercise-rules">
                                    <li>Longer rule describing exercise</li>
                                    <li>Second rule describing exercise but the text is even longer</li>
                                </ol>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Button onClick={handleClick} id="hide-button" variant="success">Begin Exercise</Button>
                    </div>
                </div>
                <ColoringImageExercise />
                <Row id="hidden-exercise-rules" hidden>
                    <Col></Col>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Rules</Accordion.Header>
                                <Accordion.Body>
                                    <ol className="exercise-rules">
                                        <li>Longer rule describing exercise</li>
                                        <li>Second rule describing exercise but the text is even longer</li>
                                    </ol>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ColoringAnImageHome