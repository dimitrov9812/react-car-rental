import { useContext } from 'react';
import { IStore, StoreContext } from '../../store/Store';
import { IUserstore } from '../../store/UserStore';
import { Link, useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
// ROUTES
import { Routes } from '../enums/Enums';
// Styles
import './Nav.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const NavComponent = (): JSX.Element | null => {
    const history = useHistory();
    const stores: IStore = useContext(StoreContext);
    const userStore: IUserstore = stores.userStore;

    const logout = (): void => {
        userStore.logout(history)
    }

    const renderAdminLinks = (): JSX.Element | undefined => {
        if (userStore.loggedInCustomer?.isAdmin) {
            return (
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link"><Link to={Routes.ADMIN_MANAGE_VEHICLES}>(Admin) Manage Vehicles</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to={Routes.ADMIN_MANAGE_USERS}>(Admin) Manage Users</Link></a>
                    </li>
                </div>
            )
        }
    }

    const renderNav = (): JSX.Element | null => {
        if (userStore.isLoggedIn) {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href={Routes.HOME}>Car Rental</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to={Routes.HOME}>Home</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={Routes.BROWSE}>Browse</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={Routes.ALL_RENTED}>List All Rented</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={Routes.MINE_RENTED}>List My Rentals</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={Routes.REQUEST_RENTED}>Request Car</Link></a>
                            </li>
                            {renderAdminLinks()}
                        </ul>
                        <FontAwesomeIcon onClick={() => userStore.logout(history)} icon={faSignInAlt} color='black' size={'2x'} className="sign-out-icon"/>
                    </div>
                </nav>
            )
        }
        return null
    }
    return useObserver(() => (
        renderNav()
    ))
}

export default NavComponent;
