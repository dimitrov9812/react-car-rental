import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../store/Store';
import '../../App.css';
import VehicleCardComponent from '../vehicle/vehicle-card/VehicleCard.component';

const BrowseComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);

  return (
    <div>
        <h1>Browse Component works</h1>
        <VehicleCardComponent />
        <VehicleCardComponent />
        <VehicleCardComponent />
    </div>
  );
}

export default BrowseComponent;
