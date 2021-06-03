import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../store/Store';
import { IUserstore } from '../../../store/UserStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTimesCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { useObserver } from 'mobx-react-lite';
import { Customer } from '../../../models/CustomerModel';
import UserEditModalComponent from '../user-edit-modal/UserEditModal.component';
import '../../../App.css';
import { IVehicleStore } from '../../../store/VehicleStore';
import { RentedVehicle } from '../../../models/RentedVehicleModel';
import axios from 'axios';
import { URL } from '../../../endpoints/endpoints';
import { Vehicle } from '../../../models/VehicleModel';

const UserRowRecordComponent: React.FC<any> = ({ customer }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const userStore: IUserstore = store.userStore;
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _customer: Customer = customer;
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    const renderModal = (): JSX.Element | undefined => {
        if (isModalActive) {
            return (
                <UserEditModalComponent customer={_customer} isActive={isModalActive} action={() => setIsModalActive(false)}/>
            )
        }
    }

    const handleRemoveCustomer = (): void => {
        if (vehicleStore.rentedVehicles.length == 0) {
            vehicleStore.getAllRentedVehicles()
                        .then(() => {
                             removeCustomerAndVehicle();
                        });
        } else {
            removeCustomerAndVehicle()
        }
        
    }
    
    const removeCustomerAndVehicle = (): void => {
        vehicleStore.rentedVehicles
                            .map((vehicle: RentedVehicle) => {
                                if (vehicle.customerID == +_customer.id) {
                                    axios.delete(URL.rentedVehicles+`/${vehicle.id}`)
                                         .then(() => {
                                            let vehicleIdToUpdateIndex: number = vehicleStore.vehicles.findIndex((v: Vehicle) => +v.id == vehicle.vehicleId);
                                            if (vehicleIdToUpdateIndex != -1) {
                                                vehicleStore.vehicles[vehicleIdToUpdateIndex].isCurrentlyRented = false;
                                                vehicleStore.editVehicle(vehicleStore.vehicles[vehicleIdToUpdateIndex]);
                                            }
                                         }).then(() => {
                                                userStore.removeCustomer(_customer.id);
                                         });
                                }
                            });
    }

    return useObserver(() => (
        <>
        <tr>
            <td style={{ textAlign: 'center' }}>{_customer.id}</td>
            <td style={{ textAlign: 'center' }}>{_customer.name}</td>
            <td style={{ textAlign: 'center' }}>{_customer.email}</td>
            <td style={{ textAlign: 'center' }}>{_customer.phoneNumber}</td>
            <td style={{ textAlign: 'center' }}>{_customer.totalVehiclesRented}</td>
            <td style={{ textAlign: 'center' }}>{_customer.isVIP ? <FontAwesomeIcon icon={faCrown} color='gold' /> : <FontAwesomeIcon icon={faTimesCircle} color='red' />}</td>
            <td style={{ textAlign: 'center' }}>{_customer.isAdmin ? <FontAwesomeIcon icon={faCheckSquare} color='green' /> : <FontAwesomeIcon icon={faTimesCircle} color='red' />}</td>
            <td style={{ textAlign: 'center' }}>
                {_customer.isAdmin ?
                 <button type="button" className="btn btn-success" disabled>Edit</button> :
                 <button className="btn btn-success" data-toggle="modal" contentEditable="false" onClick={() => setIsModalActive(!isModalActive)}>Edit</button>}
                
            </td>
            <td style={{ textAlign: 'center' }}>
                {_customer.isAdmin ?
                 <button className="btn btn-danger" data-toggle="modal" contentEditable="false" disabled>Remove</button> :
                 <button className="btn btn-danger" data-toggle="modal" contentEditable="false" onClick={() => handleRemoveCustomer()}>Remove</button> }
            </td>
        </tr>
        {renderModal()}
        </>
    ))
}

export default UserRowRecordComponent;
