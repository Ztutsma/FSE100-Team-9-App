import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import Splash from './pages/Splash';
import Home from "./pages/Home";
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
