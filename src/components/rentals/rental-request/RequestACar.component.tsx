import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
// Styles
import '../../../App.css';
import VehicleDetailsCardComponent from '../../vehicle/vehicle-details-card/VehicleDetailsCard.component';
import { Routes } from '../../enums/Enums';

const RequestACarComponent: React.FC<any> = (): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: Vehicle | undefined = vehicleStore.selectedVehicleDetails;

    const [isVehicleSelected, setIsVehicleSelected] = useState<boolean>(false);

    useEffect(() => {
        if (vehicleStore.vehicles.length == 0) {
            vehicleStore.getAllVehicles();
        }

        vehicleStore.selectedVehicleDetails = undefined;
    },[])

    const handleVehicleSelect = (vehicle: Vehicle): void => {
        vehicleStore.selectedVehicleDetails = vehicle;
    }

    return useObserver(() => (
        <div style={{paddingTop: 20}}>
            <div  style={{display:'flex', justifyContent: 'flex-start', width: '80%', margin: '0 auto'}}>
                <h1>Request a car</h1>
            </div>
                <div>
                    <div style={{display:'flex', width: '65%', margin: '0 auto', justifyContent: 'space-between', alignItems: "center"}}>
                        <div className="form-group" style={{width: '90%'}}>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option onClick={() => vehicleStore.selectedVehicleDetails = undefined}></option>
                            {vehicleStore.vehicles
                                        .map((vehicle: Vehicle) => {
                                            if (!vehicle.isCurrentlyRented) return <option onClick={() => handleVehicleSelect(vehicle)}>{vehicle.brand} - {vehicle.model}</option>
                                        })}
                            </select>
                        </div>
                        <div>
                            {!vehicleStore.selectedVehicleDetails ?
                                <button className="btn btn-primary" disabled>BOOK NOW</button> :
                                <button className="btn btn-primary" onClick={() => history.push(Routes.RENT_A_CAR)}>BOOK NOW</button>
                            }
                        </div>
                    </div>
                    {vehicleStore.selectedVehicleDetails ? <VehicleDetailsCardComponent vehicle={_vehicle}/> :
                    <div style={{width: '80%', margin: '0 auto', display: 'flex', justifyContent: 'center', paddingTop: 20}}>No Selected Vehicle</div>}
                </div>
        </div>
    ))
}

export default RequestACarComponent;
