import TracingLinesExercise from "../../components/exercises/TracingLinesExercise";
import {Col, Container, Row, Button, Accordion} from "react-bootstrap";


function TracingLinesHome() {

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
                    <h2>Tracing Lines</h2>
                    <div id="exercise-info">
                        <p>Rules of the exercise:</p>
                        <Row>
                            <Col>
                                <ol className="exercise-rules">
                                    <li>Once the exercise starts, Click and hold down the mouse button</li>
                                    <li>Try to trace as close to the line as you can</li>
                                    <li>If you stray too far from the line the background will turn red</li>
                                    <li>If you let go of the mouse button while the background is red,
                                        the circle will be reset back to the closest point on the line </li>
                                    <li>Once the background turns green, the exercise is complete </li>
                                </ol>
                            </Col>
                        </Row>
                        <Button onClick={handleClick} id="hide-button" variant="success">Begin Exercise</Button>
                    </div>
                </div>
                <TracingLinesExercise />
                <Row id="hidden-exercise-rules" hidden>
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Rules</Accordion.Header>
                                <Accordion.Body>
                                    <ol className="exercise-rules">
                                        <li>Once the exercise starts, Click and hold down the mouse button</li>
                                        <li>Try to trace as close to the line as you can</li>
                                        <li>If you stray too far from the line the background will turn red</li>
                                        <li>If you let go of the mouse button while the background is red,
                                            the circle will be reset back to the closest point on the line </li>
                                        <li>Once the background turns green, the exercise is complete </li>
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

export default TracingLinesHome