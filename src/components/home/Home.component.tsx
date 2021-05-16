import { useContext, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../store/Store';
import { useHistory } from 'react-router';
import '../login/Login.component.css';

const HomeComponent: React.FC<{}> = () => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);

  // Check if user is already logged in and redirect to home if true
  useEffect(() => {
    if (!store.isLoggedIn) {
        history.push('/login');
    }
  });

  return useObserver(() => (
    <div>
        HOME
    </div>
  ))
}

export default HomeComponent;
