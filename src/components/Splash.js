import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";

function Splash() {
    return(
        <div id="splash-page">
            <Container>
                <h1>Improve your child's fine motor skills!</h1>
                <Link to="/Home">
                    <Button>Get Started</Button>
                </Link>
            </Container>
        </div>
    );
}

export default Splash