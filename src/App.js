import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import Splash from './components/Splash';
import Home from "./components/Home";
import {Container} from "react-bootstrap";

function App() {
  return (
    <div>
        <Container className="App">
            <Switch>
                <Route path="/Home">
                    <Home />
                </Route>
                <Route path="/">
                    <Splash />
                </Route>
            </Switch>
        </Container>
    </div>
  );
}

export default App;
