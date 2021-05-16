import { useContext } from 'react';
import { IStore, StoreContext } from '../../store/Store';
import { Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';

const NavComponent = (): JSX.Element | null => {
  const store: IStore = useContext(StoreContext)

  const renderNav = (): JSX.Element | null => {
      if (store.loggedIn) {
          return (
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
