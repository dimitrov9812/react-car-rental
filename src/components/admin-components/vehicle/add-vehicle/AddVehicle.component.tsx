import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../../store/Store';
import '../../../../App.css';

const AddVehicleComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);

  return (
    <div>
        <h1>Add Vehicle Component works</h1>
    </div>
  );
}

export default AddVehicleComponent;
