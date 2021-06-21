import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Firebaseauthprovider } from "./Auth";
import Private from "./pages/Private";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Admin from "./pages/Admin";

function App() {
  return (
    <Firebaseauthprovider>
      <Router>
        <Switch>
          <Private exact path="/dashboard" component={Dashboard} />
          <Private exact path="/form" component={Form} />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/register">
            <Register />
          </Route>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Router>
    </Firebaseauthprovider>
  );
}

export default App;
