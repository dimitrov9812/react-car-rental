import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import { useObserver } from 'mobx-react-lite';
import { RentedVehicle } from '../../../models/RentedVehicleModel';
import '../../../App.css';

const RentedCarRowRecordComponent: React.FC<any> = ({ rentedVehicle }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: RentedVehicle = rentedVehicle;

    return useObserver(() => (
        <>
        <tr>
            <td style={{ textAlign: 'center' }}>{_vehicle.id}</td>
            <td className="">{_vehicle.customerID}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.vehicleId}</td>
            <td style={{ textAlign: 'center' }}>{new Date(_vehicle.startDate).toLocaleDateString()}</td>
            <td style={{ textAlign: 'center' }}>{new Date(_vehicle.endDate).toLocaleDateString()}</td>
        </tr>
        </>
    ))
}

export default RentedCarRowRecordComponent;
