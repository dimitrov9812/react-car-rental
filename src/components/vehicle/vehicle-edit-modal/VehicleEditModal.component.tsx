import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import { FuelTypes, VehicleProperties, VehicleTypes } from '../../enums/Enums';
// Styles
import '../../../App.css';
import './VehicleEditModal.component.css';

const VehicleEditModalComponent: React.FC<any> = ({ vehicle, isActive, action }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: Vehicle = vehicle;
    const [isModalActive, setIsModalActive] = useState<boolean>(isActive);

    // Form Controlls
    const [newVehicle, SetNewVehicle] = useState<Vehicle>(_vehicle);

    // Handle form error
    const [error, setError] = useState<string>('')

    // Function which closes the modal and then calls an action to the parent component which updates it's state also
    const handleModalClose = (): void => {
        setIsModalActive(false);
        // call the action which the parent will recieve and react to
        action();
    }

    const performValidation = (): boolean => {
        if (newVehicle.brand == "" || newVehicle.brand.length < 3) {
            setError('Brand must be at least 3 characters');
            return false;
        } else if (newVehicle.model == "" || newVehicle.model.length < 2) {
            setError('Model must be at least 2 characters');
            return false;
        } else if (newVehicle.constructionYear.toString().length != 4 || newVehicle.constructionYear >= +new Date(Date.now()).getFullYear) {
            setError('You must enter a valid year');
            return false;
        }  else if (newVehicle.vehicleType == null) {
            setError('You must select vehicle type');
            return false;
        } else if (newVehicle.fuelType == null) {
            setError('You must select fuel type');
            return false;
        } else if (newVehicle.picture == "") {
            setError('You must enter a valid picture url');
            return false;
        } else if (newVehicle.numberOfSeats < 3 || newVehicle.numberOfSeats > 50) {
            setError('Seats of the vehicle must be from 3 - 50 (Large Vehicles)');
            return false;
        } else if (newVehicle.pricePerDay == 0 || newVehicle.pricePerDay < 50) {
            setError('Price must be at lest 50$');
            return false;
        } else if (newVehicle.availableVehicles < 1 || newVehicle.availableVehicles > 10) {
            setError('Our company can have from 1 - 10 available vehicle from each type');
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

        vehicleStore.editVehicle(newVehicle);
        handleModalClose();
    }

    const renderVehicleEditForm = () => {
        return (
            <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
                <div className="form-content">
                    <div className="form-group">
                        <h3 className="form-heading">EDIT VEHICLE</h3>
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.BRAND}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Chevrolet"
                            value={newVehicle.brand}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.brand = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.MODEL}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Camaro"
                            value={newVehicle.model}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.model = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.CONSTRUCTION_YEAR}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="2012"
                            value={newVehicle.constructionYear}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.constructionYear = +e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.VEHICLE_TYPE}</label><br />
                        <select className="form-control"
                            id="exampleFormControlSelect1"
                            style={{width: '85%'}}
                            value={newVehicle.vehicleType}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => _vehicle.vehicleType = e.target.value}>
                            <option>{null}</option>  
                            <option>{VehicleTypes.CARGO}</option>
                            <option>{VehicleTypes.ECONOMY}</option>
                            <option>{VehicleTypes.ESTATE}</option>
                            <option>{VehicleTypes.LUXURY}</option>
                            <option>{VehicleTypes.SUV}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.FUEL_TYPE}</label><br />
                        <select className="form-control"
                            id="exampleFormControlSelect2"
                            value={newVehicle.fuelType}
                            style={{width: '85%'}}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => _vehicle.fuelType = e.target.value}>
                            <option>{null}</option>
                            <option>{FuelTypes.DIESEL}</option>
                            <option>{FuelTypes.ELECTRIC}</option>
                            <option>{FuelTypes.HYBRID}</option>
                            <option>{FuelTypes.PETROL}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.SEATS}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Enter how many seats the vehicle has"
                            value={newVehicle.numberOfSeats}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.numberOfSeats = +e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.IMAGE}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Paste a link with an image of the vehicle"
                            value={newVehicle.picture}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.picture = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.AVAILABLE_VEHICLES}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Number of vehicles available for rent"
                            value={newVehicle.availableVehicles}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.availableVehicles = +e.target.value} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.PRICE}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="100$"
                            value={newVehicle.pricePerDay}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => _vehicle.pricePerDay = +e.target.value} />
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
                <div style={{ position: 'absolute', top: '2%', left: '25%', zIndex: 2, width: '50%', height: 'auto', backgroundColor: 'black'}}>
                    <div className="close-button" onClick={() => handleModalClose()}>X</div>
                    {renderVehicleEditForm()}
                </div>
            </div> : <div></div>
    ))
}

export default VehicleEditModalComponent;
