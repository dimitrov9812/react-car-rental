import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link to="/browse">browse</Link>
            </li>
            <li>
              <Link to="/vehicle-details">vehicle-details</Link>
            </li>
            <li>
              <Link to="/rentals/all">all rentals</Link>
            </li>
            <li>
              <Link to="/rentals/mine">mine rentals</Link>
            </li>
            <li>
              <Link to="/rentals/request">request rentals</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <div>login</div>
          </Route>
          <Route path="/home">
            <div>home</div>
          </Route>
          <Route path="/browse">
            <div>browse</div>
          </Route>
          <Route path="/vehicle-details">
            <div>vehicle-details</div>
          </Route>
          <Route path="/rentals/all">
            <div>all rentals</div>
          </Route>
          <Route path="/rentals/mine">
            <div>mine rentals</div>
          </Route>
          <Route path="/rentals/request">
            <div>request rental</div>
          </Route>
          <Route path="/">
            <div>login</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
