import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import VehicleEditModalComponent from '../vehicle-edit-modal/VehicleEditModal.component';
import { useObserver } from 'mobx-react-lite';
import '../../../App.css';

const VehicleRowRecordComponent: React.FC<any> = ({ vehicle }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: Vehicle = vehicle;
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    const renderModal = (): JSX.Element | undefined => {
        if (isModalActive) {
            return (
                <VehicleEditModalComponent vehicle={_vehicle} isActive={isModalActive} action={() => setIsModalActive(false)}/>
            )
        }
    }
    return useObserver(() => (
        <>
        <tr>
            <td style={{ textAlign: 'center' }}>{_vehicle.id}</td>
            <td style={{ textAlign: 'center' }}><img src={_vehicle.picture} style={{ width: 100 }} /></td>
            <td className="">{_vehicle.brand}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.model}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.constructionYear}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.vehicleType}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.fuelType}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.numberOfSeats}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.availableVehicles}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.isCurrentlyRented ? <FontAwesomeIcon icon={faCheckSquare} color='green' /> : <FontAwesomeIcon icon={faTimesCircle} color='red' />}</td>
            <td style={{ textAlign: 'center' }}>{_vehicle.pricePerDay}$</td>
            <td style={{ textAlign: 'center' }}>
                {_vehicle.isCurrentlyRented ?
                 <button type="button" className="btn btn-success" disabled>Edit</button> :
                 <button className="btn btn-success" data-toggle="modal" contentEditable="false" onClick={() => setIsModalActive(!isModalActive)}>Edit</button>}
                
            </td>
            <td style={{ textAlign: 'center' }}>
                {_vehicle.isCurrentlyRented ?
                 <button className="btn btn-danger" data-toggle="modal" contentEditable="false" disabled>Remove</button> :
                 <button className="btn btn-danger" data-toggle="modal" contentEditable="false" onClick={() => vehicleStore.removeVehicle(_vehicle.id)}>Remove</button> }
            </td>
        </tr>
        {renderModal()}
        </>
    ))
}

export default VehicleRowRecordComponent;
