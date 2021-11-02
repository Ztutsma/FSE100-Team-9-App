import ColoringImageExercise from "./ColoringImageExercise";
import {Col, Container, Row, Button, Accordion} from "react-bootstrap";


function ColoringAnImageHome() {

    const handleClick = () =>{
        document.getElementById("exercise-info").hidden = true;
        document.getElementById("hidden-exercise-rules").hidden = false;
        if(document.getElementById("exercise")) {
            document.getElementById("exercise").hidden = false;
        }
        if(document.getElementById("stage")) {
            document.getElementById("stage").hidden = false;
        }
    }

    return(
        <div>
            <Container>
                <div className="exercise-header">
                    <h2>Coloring an Image</h2>
                    <div id="exercise-info">
                        <p>Rules of the exercise:</p>
                        <Row>
                            <Col>
                                <ol className="exercise-rules">
                                    <li>After clicking begin exercise, an image of an animal will appear on the screen</li>
                                    <li>Clicking and holding the mouse button will color in the animal</li>
                                    <li>Try to stay within the border of the animal's primary shapes</li>
                                    <li>If you go outside the borders the bar at the top will turn red</li>
                                </ol>
                            </Col>
                        </Row>
                        <Button onClick={handleClick} id="hide-button" variant="success">Begin Exercise</Button>
                    </div>
                </div>
                <ColoringImageExercise />
                <Row id="hidden-exercise-rules" hidden>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Rules</Accordion.Header>
                                <Accordion.Body>
                                    <ol className="exercise-rules">
                                        <li>After clicking begin exercise, an image of an animal will appear on the screen</li>
                                        <li>Clicking and holding the mouse button will color in the animal</li>
                                        <li>Try to stay within the border of the animal's primary shapes</li>
                                        <li>If you go outside the borders the bar at the top will turn red</li>
                                    </ol>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ColoringAnImageHome