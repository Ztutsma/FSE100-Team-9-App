import TappingCirclesExercise from "../../components/exercises/TappingCirclesExercise";
import {Col, Container, Row, Button, Accordion} from "react-bootstrap";



function TappingCirclesHome() {

    const handleClick = () =>{
        document.getElementById("exercise-info").hidden = true;
        document.getElementById("exercise").hidden = false;
        document.getElementById("hidden-exercise-rules").hidden = false;
    }

    return(
        <div>
            <Container>
                <div className="exercise-header">
                    <h2>Tapping Circles</h2>
                    <div id="exercise-info">
                        <p>Rules of the exercise:</p>
                        <Row>
                            <Col>
                                <ol className="exercise-rules">
                                    <li>Try to click on the moving circle</li>
                                    <li>Successfully clicking the circle will play a bell sound</li>
                                    <li>Missing the circle will play a buzzer sound</li>
                                </ol>
                            </Col>
                        </Row>
                        <Button onClick={handleClick} id="hide-button" variant="success">Begin Exercise</Button>
                    </div>
                </div>
                <TappingCirclesExercise />
                <Row id="hidden-exercise-rules" hidden>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Rules</Accordion.Header>
                                <Accordion.Body>
                                    <ol className="exercise-rules">
                                        <li>Try to click on the moving circle</li>
                                        <li>Successfully clicking the circle will play a bell sound</li>
                                        <li>Missing the circle will play a buzzer sound</li>
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

export default TappingCirclesHome