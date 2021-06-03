import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../store/Store';
import { IVehicleStore } from '../../../store/VehicleStore';
import { Vehicle } from '../../../models/VehicleModel';
import '../../../App.css';
import SpinnerComponent from '../../../spinner/Spinner.component';
import VehicleCardComponent from '../vehicle-card/VehicleCard.component';
import VehicleDetailsCardComponent from '../vehicle-details-card/VehicleDetailsCard.component';

const VehicleDetailsComponent: React.FC<any> = (): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const vehicle = vehicleStore.selectedVehicleDetails;

    const renderMainContent = (): JSX.Element => {
        if (vehicle) {
            return <VehicleDetailsCardComponent vehicle={vehicle} isActionsEnabled={true}/>
        } else {
            return <div>No vehicle found with the selected id</div>
        }
    }

    return (
        <div>
            {renderMainContent()}
        </div>
    )
}

export default VehicleDetailsComponent;
