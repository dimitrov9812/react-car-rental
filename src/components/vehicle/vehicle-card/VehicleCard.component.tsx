import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../store/Store';
import '../../../App.css';

const VehicleCardComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);

  return (
    <div>
        <h1 onClick={() => history.push('/vehicle-details')}>Vehicle Card works</h1>
    </div>
  );
}

export default VehicleCardComponent;
