import { useContext, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import { IUserstore } from '../../store/UserStore';
import { useHistory } from 'react-router';
import '../login/Login.component.css';

const HomeComponent: React.FC<{}> = () => {
  const history = useHistory();
  const stores: IStore = useContext(StoreContext);
  const userStore: IUserstore = stores.userStore;

  // Check if user is already logged in and redirect to home if true
  useEffect(() => {
    if (!userStore.isLoggedIn) {
        history.push('/login');
    }
  });

  return useObserver(() => (
    <div>
        HOME  <br/>
        {userStore.loggedInCustomer?.email} <br/>
        {userStore.loggedInCustomer?.name} <br/>
    </div>
  ))
}

export default HomeComponent;
