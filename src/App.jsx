import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Firebaseauthprovider } from "./Auth";
import Private from "./pages/Private";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Search from "./pages/Search";
import AdminDashboard from "./pages/AdminDashboard";
import Form from "./pages/Form";

function App() {
  return (
    <Firebaseauthprovider>
      <Router>
        <Switch>
          <Private exact path="/dashboard" component={Dashboard} />
          <Private exact path="/search" component={Search} />
          <Private exact path="/form" component={Form} />
          <Route path="/admin" exact>
            <AdminDashboard />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/register">
            <Register />
          </Route>
          <Route path="/auth/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Firebaseauthprovider>
  );
}

export default App;
