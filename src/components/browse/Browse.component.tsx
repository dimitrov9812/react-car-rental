import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../store/Store';
import '../../App.css';
import VehicleCardComponent from '../vehicle/vehicle-card/VehicleCard.component';
import { IVehicleStore } from '../../store/VehicleStore';
import SpinnerComponent from '../../spinner/Spinner.component';
import { Vehicle } from '../../models/VehicleModel';

const BrowseComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);
  const vehicleStore: IVehicleStore = store.vehicleStore;

  const [isLoadingVehicles, SetIsLoadingVehicles] = useState(false);

  useEffect(() => {
    SetIsLoadingVehicles(true);
    vehicleStore.getAllVehicles()
                .then(() => SetIsLoadingVehicles(false));
  }, []);

  const renderMainContent = (): JSX.Element | undefined => {
    if (isLoadingVehicles) {
      return (
        <SpinnerComponent />
      )
    } else {
      if (vehicleStore.vehicles.length != 0) {
        return (
          <div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '80%', margin: '0 auto'}}>
              <h1>Browse Cars</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '80%', margin: '0 auto'}}>
                {vehicleStore.vehicles
                             .map((vehicle: Vehicle) => <VehicleCardComponent key={vehicle.id} vehicle={vehicle}/>)}
          </div>
          </div>
          
        )
      } else {
        return (
          <div>
            <h6>no vehicles available in the moment</h6>
          </div>
        )
      }
    }
  }
  return (
    <div style={{backgroundColor: 'white'}}>
      {renderMainContent()}
    </div>
  ) 
}

export default BrowseComponent;
