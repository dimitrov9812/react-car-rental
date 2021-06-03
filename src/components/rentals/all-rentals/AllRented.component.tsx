import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { IStore, StoreContext } from '../../../store/Store';
import { RentedVehicle } from '../../../models/RentedVehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import SpinnerComponent from '../../../spinner/Spinner.component';
import TableHeadComponent from '../../table/table-head-component/TableHead.component';
import { RentedVehicleProperties } from '../../enums/Enums';
import RentedCarRowRecordComponent from '../rented-vehicle-row-record/RentedCarRowRecord.component';
// Styles
import '../../../App.css';

const AllRentedComponent: React.FC<any> = (): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;

    const [rentedVehicles, setRentedVehicles] = useState<RentedVehicle[]>([]);

    const rentedVehicleTableColumns: string[] = [RentedVehicleProperties.ID,
                                        RentedVehicleProperties.USER_ID,
                                        RentedVehicleProperties.VEHICLE_ID,
                                        RentedVehicleProperties.START_DATE,
                                        RentedVehicleProperties.END_DATE];


    useEffect(() => {
            vehicleStore.getAllRentedVehicles()
                        .then(() => {
                            setRentedVehicles(vehicleStore?.rentedVehicles);
                        });
    },[]);

    return useObserver(() => (
        <div style={{paddingTop: 20, width: '80%', margin: '0 auto', backgroundColor: 'white'}}>
            <h1>All Rented Cars</h1>
            {vehicleStore.isLoading ?
            <SpinnerComponent />
            :
            <div>
                {rentedVehicles.length != 0 ?
                    <div style={{padding: 20,backgroundColor: 'white'}}>
                    <table className="table table-bordered table-striped">
                        <TableHeadComponent columns={rentedVehicleTableColumns} />
                        <tbody>
                            {vehicleStore.rentedVehicles
                                         .map((rentedVehicle: RentedVehicle) => {
                                         return (
                                            <RentedCarRowRecordComponent rentedVehicle={rentedVehicle} />
                                         )
                                         })}
                        </tbody>
                    </table>
                    </div>
                    :
                    <div>
                        No Vehicles currenlty rented
                    </div>
                }
            </div>
            }
                
        </div>
    ))
}

export default AllRentedComponent;
