import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { IUserstore } from '../../../store/UserStore';
import { IStore, StoreContext } from '../../../store/Store';
import { UserProperties } from '../../enums/Enums';
import { Customer } from '../../../models/CustomerModel';
// Styles
import '../../../App.css';
import './UserEditModal.component.css';
import { validateEmail, validatePhoneNumber } from '../../utils/commonFunctions';

const UserEditModalComponent: React.FC<any> = ({ customer, isActive, action }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const userStore: IUserstore = store.userStore;
    const _customer: Customer = customer;
    const [isModalActive, setIsModalActive] = useState<boolean>(isActive);

    // Form Controlls
    const [newCustomer, SetNewCustomer] = useState<Customer>(_customer);

    // Handle form error
    const [error, setError] = useState<string>('');

    // Function which closes the modal and then calls an action to the parent component which updates it's state also
    const handleModalClose = (): void => {
        setIsModalActive(false);
        // call the action which the parent will recieve and react to
        action();
    }

    const performValidation = (): boolean => {
        if (newCustomer.name.length < 5) {
            setError('Your name must be at least 5 characters long');
            return false;
        } else if (newCustomer.name.length > 55) {
            setError('Your name must not be more than 55 characters long');
            return false;
        } else if (!validateEmail(newCustomer.email)) {
            setError('You must enter a valid email');
            return false;
        } else if (!validatePhoneNumber(newCustomer.phoneNumber)) {
            setError('You must enter a valid phone number');
            return false;
        }

        return true;
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        let isFormValid: boolean = performValidation();

        if (!isFormValid) {
            return;
        }

        userStore.editCustomer(newCustomer);
        handleModalClose();
    }

    const renderUserEditForm = () => {
        return (
            <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
                <div className="form-content">
                    <div className="form-group">
                        <h3 className="form-heading">Edit User</h3>
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.NAME}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="enter your name"
                            value={newCustomer.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _customer.name = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.EMAIL}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="enter your email"
                            value={newCustomer.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _customer.email = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.PHONE_NUMBER}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="+359 999 999 999"
                            value={newCustomer.phoneNumber}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _customer.phoneNumber = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{UserProperties.ISADMIN}</label><br />
                        <input type="checkbox"
                               defaultChecked={newCustomer.isAdmin}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => _customer.isAdmin = !_customer.isAdmin} />
                    </div>

                    {error ? 
                        <div className="error-wrap">
                            <h6 className="error">{error}</h6>
                        </div> : null
                    }

                    <div className="save-button-wrap">
                        <button className="btn btn-success save-button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFormSubmit(e)}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    return useObserver(() => (
        isModalActive ?
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div style={{ position: 'absolute', top: '10%', left: '25%', zIndex: 2, width: '50%', height: 'auto', backgroundColor: 'black'}}>
                    <div className="close-button" onClick={() => handleModalClose()}>X</div>
                    {renderUserEditForm()}
                </div>
            </div> : <div></div>
    ))
}

export default UserEditModalComponent;
