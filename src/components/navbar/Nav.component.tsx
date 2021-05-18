import { useContext } from 'react';
import { IStore, StoreContext } from '../../store/Store';
import { IUserstore } from '../../store/UserStore';
import { Link, useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';

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
                <div>
                    <li>
                        <Link to="/manage-vehicles">(Admin) Manage Vehicles</Link>
                    </li>
                    <li>
                        <Link to="/manage-users">(Admin) Manage Users</Link>
                    </li>
                </div>

            )
        }
    }

    const renderNav = (): JSX.Element | null => {
        if (userStore.isLoggedIn) {
            return (
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/home">home</Link>
                            </li>
                            <li>
                                <Link to="/browse">browse</Link>
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
                            {renderAdminLinks()}
                            <li>
                                <button onClick={() => logout()}>
                                    Logout
                  </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        } else {
            return null
        }
    }
    return useObserver(() => (
        renderNav()
    ))
}

export default NavComponent;
