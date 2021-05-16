import { useContext } from 'react';
import { IStore, StoreContext } from '../../store/Store';
import { Link, useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';

const NavComponent = (): JSX.Element | null => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);

    const logout = (): void => {
        store.logout(history)
    }

    const renderNav = (): JSX.Element | null => {
        if (store.isLoggedIn) {
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
