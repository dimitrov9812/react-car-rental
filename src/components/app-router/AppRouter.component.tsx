import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Switch,
    Route,
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
import { IStore, StoreContext } from '../../store/Store';
import { IUserstore } from '../../store/UserStore';
import { useObserver } from 'mobx-react-lite';
// Routes
import { Routes } from '../enums/Enums';
// Components
import LoginComponent from '../login/Login.component';
import RegisterComponent from '../register/Register.component';
import NavComponent from '../navbar/Nav.component';
import HomeComponent from '../home/Home.component';
import ManageVehiclesComponent from '../admin-components/vehicle/manage-vehicles/ManageVehicles.component';
import ManageUsersComponent from '../admin-components/vehicle/users/manage-users/ManageUsers.component';
import BrowseComponent from '../browse/Browse.component';
import VehicleDetailsComponent from '../vehicle/vehicle-details/VehicleDetails.component';
import RentACarComponent from '../rentals/rent-a-car/RentACar.component';
import RequestACarComponent from '../rentals/rental-request/RequestACar.component';
import MyRentedCarsComponent from '../rentals/user-rentals/MyRentedCars.component';
import AllRentedComponent from '../rentals/all-rentals/AllRented.component';

const AppRouterComponent = (): JSX.Element | null => {
    const stores: IStore = useContext(StoreContext);
    const userStore: IUserstore = stores.userStore;
    const history = useHistory();

    // Check if user is already logged in with the help of localstorage
    useEffect(() => {
        // declare the function
        const checkAsyncStorage = async () => {
            userStore.isLoading = true;
            let isAuthenticated: string | null = await AsyncStorage.getItem('isAuthenticated');
            let email: string | null = await AsyncStorage.getItem('email');
            if (isAuthenticated === "1" && email !== "null") {
                if (email != null) {
                    userStore.login(email, history);
                }
            } else {
                userStore.isLoggedIn = false;
                userStore.isLoading = false;
            }
        }
        // Call the function
        if (!userStore.isLoggedIn) {
            checkAsyncStorage();
        }
    }, []);

    const renderAdminRoutes = (): JSX.Element => {
        return (
            <div>
                <Route exact path={Routes.ALL_RENTED}>
                    <AllRentedComponent />
                </Route>
                <Route exact path={Routes.ADMIN_MANAGE_VEHICLES}>
                    <ManageVehiclesComponent />
                </Route>
                <Route exact path={Routes.ADMIN_MANAGE_USERS}>
                    <ManageUsersComponent />
                </Route>
            </div>
        )
    }

    const renderUserRoutes = (): JSX.Element => {
        return (
            <div>
                <Route exact path={Routes.MINE_RENTED}>
                    <MyRentedCarsComponent />
                </Route>
                <Route exact path={Routes.REQUEST_RENTED}>
                    <RequestACarComponent />
                </Route>
                <Route exact path={Routes.RENT_A_CAR}>
                    <RentACarComponent />
                </Route>
            </div>
        )
    }

    return useObserver(() => (
        <Router>
            <NavComponent />
            <Switch>
                <Route exact path={Routes.DEFAULT} component={LoginComponent} />
                <Route exact path={Routes.LOGIN} component={LoginComponent} />
                <Route exact path={Routes.REGISTER} component={RegisterComponent} />
                <Route exact path={Routes.HOME} component={HomeComponent} />
                <Route exact path={Routes.BROWSE}>
                    <BrowseComponent />
                </Route>
                <Route exact path={Routes.VEHICLE_DETAILS}>
                    <VehicleDetailsComponent />
                </Route>
                
                {userStore.loggedInCustomer?.isAdmin ? renderAdminRoutes() : renderUserRoutes()}
            </Switch>
        </Router>
    ))
}

export default AppRouterComponent;
