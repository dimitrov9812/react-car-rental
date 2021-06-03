import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IStore, StoreContext } from '../../../store/Store';
import { UserProperties } from '../../enums/Enums';
import { IUserstore } from '../../../store/UserStore';
import { Customer } from '../../../models/CustomerModel';
// Styles
import '../../../App.css';
import '../../vehicle/vehicle-edit-modal/VehicleEditModal.component.css';
import { validateEmail, validatePhoneNumber } from '../../utils/commonFunctions';

const UserAddModalComponent: React.FC<any> = ({ isActive, action }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const userStore: IUserstore = store.userStore;
    const [isModalActive, setIsModalActive] = useState<boolean>(isActive);

    // FORM CONTROLLS
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // Handle form error
    const [error, setError] = useState<string>('');

    // Function which closes the modal and then calls an action to the parent component which updates it's state also
    const handleModalClose = (): void => {
        setIsModalActive(false);
        // call the action which the parent will recieve and react to
        action();
    }

    const performValidation = (): boolean => {
        if (name.length < 5) {
            setError('Your name must be at least 5 characters long');
            return false;
        } else if (name.length > 55) {
            setError('Your name must not be more than 55 characters long');
            return false;
        } else if (!validateEmail(email)) {
            setError('You must enter a valid email');
            return false;
        } else if (!validatePhoneNumber(phoneNumber)) {
            setError('You must enter a valid phone number');
            return false;
        }

        return true;
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        let isFormValid: boolean = performValidation();

        if (isFormValid) {
            // get the maximum item id
            let maxID: number = 1;

            userStore.customers.map((customer: Customer) => {
                if (+customer.id > maxID) {
                    maxID = +customer.id
                }
            });
            
            // Create the customer
            let customer: Customer = new Customer((maxID + 1).toString(),
                                                 name,
                                                 email,
                                                 phoneNumber,
                                                 isAdmin,
                                                 false,
                                                 [],
                                                 0);

            // Call the store addVehicle method
            userStore.addCustomer(customer);
            // Close the modal
            handleModalClose();
        }

    }

    const renderCustomerAddForm = () => {
        return (
            <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
                <div className="form-content">
                    <div className="form-group">
                        <h3 className="form-heading">Add User</h3>
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.NAME}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="enter your name"
                            required
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.EMAIL}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="enter your email"
                            value={email}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.PHONE_NUMBER}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="+359 999 999 999"
                            required
                            value={phoneNumber}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPhoneNumber(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.ISADMIN}</label><br />
                        <input type="checkbox"
                            required
                            checked={isAdmin}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setIsAdmin(!isAdmin); setError('')}} />
                    </div>
                    {error ? 
                        <div className="error-wrap">
                            <h6 className="error">{error}</h6>
                        </div> : null
                    }
                    
                    <div className="save-button-wrap">
                        <button className="btn btn-success save-button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFormSubmit(e)}>
                            Add
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    return useObserver(() => (
        isModalActive ?
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div style={{ position: 'absolute', top: '10%', left: '25%', zIndex: 2, width: '50%', height: 'auto', backgroundColor: 'black' }}>
                    <div className="close-button" onClick={() => handleModalClose()}>X</div>
                    {renderCustomerAddForm()}
                </div>
            </div> : <div></div>
    ))
}

export default UserAddModalComponent;
