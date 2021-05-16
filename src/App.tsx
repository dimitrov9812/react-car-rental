import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {  StoreProvider } from './store/Store';


// Components
import LoginComponent from './components/login/Login.component';
import RegisterComponent from './components/register/Register.component';
import NavComponent from './components/navbar/Nav.component';

const App = (): JSX.Element => {
  return (
    <StoreProvider>
    <Router>
      <div>
         <NavComponent />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
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
            <LoginComponent/>
          </Route>
        </Switch>
      </div>
    </Router>
    </StoreProvider>
  );
}

export default App;
