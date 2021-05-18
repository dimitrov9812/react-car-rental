import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../../store/Store';
import '../../../../App.css';

const ManageVehiclesComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);

  return (
    <div>
        <h1>Manage Vehicles Component works</h1>
    </div>
  );
}

export default ManageVehiclesComponent;
