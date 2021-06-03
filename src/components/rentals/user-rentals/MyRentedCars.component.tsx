import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IStore, StoreContext } from '../../../store/Store';
import { IUserstore } from '../../../store/UserStore';
import { Customer } from '../../../models/CustomerModel';
// Styles
import '../../../App.css';
import VehicleDetailsComponent from '../../vehicle/vehicle-details/VehicleDetails.component';
import VehicleCardComponent from '../../vehicle/vehicle-card/VehicleCard.component';

const MyRentedCarsComponent: React.FC<any> = (): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const userStore: IUserstore = store.userStore;
    const loggedInCustomer: Customer | null = userStore.loggedInCustomer;

    const [rentedVehicles, setRentedVehicles] = useState<Vehicle[]>([]);


    useEffect(() => {
        if (!loggedInCustomer?.rentedVehicles) {
            return;
        }

        setRentedVehicles(loggedInCustomer?.rentedVehicles);
        // map the rented vehicles and get the all the rent details from the RENT DETAIL OBJECT (id, vehicleID, CustomerID, start-date, end-date);
    },[]);

    return useObserver(() => (
        <div style={{paddingTop: 20, width: '80%', margin: '0 auto', backgroundColor: 'white'}}>
            <h1>My Rented Cars</h1>
            <div>
                {rentedVehicles.length != 0 ?
                    <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                        {rentedVehicles.map((vehicle: Vehicle) => {
                            return <VehicleCardComponent vehicle={vehicle} />
                        })}
                    </div>
                    :
                    <div>
                        The user has no vehicles rented at the moment
                    </div>
                }
            </div>
        </div>
    ))
}

export default MyRentedCarsComponent;
