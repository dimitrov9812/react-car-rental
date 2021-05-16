import { useContext, useEffect } from 'react';
import {
    Switch,
    Route,
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
import { IStore, StoreContext } from '../../store/Store';
import { useObserver } from 'mobx-react-lite';
// Components
import LoginComponent from '../login/Login.component';
import RegisterComponent from '../register/Register.component';
import NavComponent from '../navbar/Nav.component';
import HomeComponent from '../home/Home.component';

const AppRouterComponent = (): JSX.Element | null => {
    const store: IStore = useContext(StoreContext);
    const history = useHistory();

    // Check if user is already logged in with the help of localstorage
    useEffect(() => {
        store.isLoading = true;
        if (localStorage.getItem('isAuthenticated') === "1" && localStorage.getItem('email') !== null) {
            let email: string | null = localStorage.getItem('email');
            if (email != null) {
                store.login(email, history);
            }
        } else {
            store.isLoggedIn = false;
            store.isLoading = false;
        }
    });

    return useObserver(() => (
        <Router>
            <NavComponent />
            <Switch>
                <Route exact path="/" component={LoginComponent} />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/register" component={RegisterComponent} />
                <Route exact path="/home" component={HomeComponent} />
                <Route exact path="/browse">
                    <div>browse</div>
                </Route>
                <Route exact path="/vehicle-details">
                    <div>vehicle-details</div>
                </Route>
                <Route exact path="/rentals/all">
                    <div>all rentals</div>
                </Route>
                <Route exact path="/rentals/mine">
                    <div>mine rentals</div>
                </Route>
                <Route exact path="/rentals/request">
                    <div>request rental</div>
                </Route>
            </Switch>
        </Router>
    ))
}

export default AppRouterComponent;
