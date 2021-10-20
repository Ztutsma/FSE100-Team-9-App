import {Link} from "react-router-dom";

function Splash() {
    return(
        <div>
            <h1>Hello World</h1>
            <Link to="/Home">
                <button> Get Started</button>
            </Link>
        </div>
    );
}

export default Splash