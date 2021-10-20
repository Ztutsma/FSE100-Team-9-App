//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import Splash from './components/Splash';
import Home from "./components/Home";

function App() {
  return (
    <div>
        <Switch>
            <Route path="/Home">
                <Home />
            </Route>
            <Route path="/">
                <Splash />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
