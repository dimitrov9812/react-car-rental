import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import { FuelTypes, VehicleProperties, VehicleTypes } from '../../enums/Enums';
// Styles
import '../../../App.css';
import '../vehicle-edit-modal/VehicleEditModal.component.css';

const VehicleAddModalComponent: React.FC<any> = ({ isActive, action }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const [isModalActive, setIsModalActive] = useState<boolean>(isActive);

    // FORM CONTROLLS
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [constructionYear, setConstructionYear] = useState<number>(0);
    const [vehicleType, setVehicleType] = useState<string>('');
    const [fuelType, setFuelType] = useState<string>('');
    const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
    const [picture, setPicture] = useState<string>('');
    const [pricePerDay, setPricePerDay] = useState<number>(0);
    const [availableVehicles, setAvailableVehicles] = useState<number>(0);
    const isCurrentlyRented: boolean = false;

    // Handle form error
    const [error, setError] = useState<string>('');

    // Function which closes the modal and then calls an action to the parent component which updates it's state also
    const handleModalClose = (): void => {
        setIsModalActive(false);
        // call the action which the parent will recieve and react to
        action();
    }

    const performValidation = (): boolean => {
        if (brand == "" || brand.length < 3) {
            setError('Brand must be at least 3 characters');
            return false;
        } else if (model == "" || model.length < 2) {
            setError('Model must be at least 2 characters');
            return false;
        } else if (constructionYear.toString().length != 4 || constructionYear >= +new Date(Date.now()).getFullYear) {
            setError('You must enter a valid year');
            return false;
        }  else if (vehicleType == null) {
            setError('You must select vehicle type');
            return false;
        } else if (fuelType == null) {
            setError('You must select fuel type');
            return false;
        } else if (picture == "") {
            setError('You must enter a valid picture url');
            return false;
        } else if (numberOfSeats < 3 || numberOfSeats > 50) {
            setError('Seats of the vehicle must be from 3 - 50 (Large Vehicles)');
            return false;
        } else if (pricePerDay == 0 || pricePerDay < 50) {
            setError('Price must be at lest 50$');
            return false;
        } else if (availableVehicles < 1 || availableVehicles > 10) {
            setError('Our company can have from 1 - 10 available vehicle from each type');
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

            vehicleStore.vehicles.map((vehicle: Vehicle) => {
                if (+vehicle.id > maxID) {
                    maxID = +vehicle.id
                }
            });
            
            // Create the vehicle
            let vehicle: Vehicle = new Vehicle((maxID + 1).toString(),
                                                brand,
                                                model,
                                                constructionYear,
                                                vehicleType,
                                                fuelType,
                                                numberOfSeats,
                                                picture,
                                                pricePerDay,
                                                availableVehicles,
                                                isCurrentlyRented);

            // Call the store addVehicle method
            vehicleStore.addVehicle(vehicle);
            // Close the modal
            handleModalClose();
        }

    }

    const renderVehicleEditForm = () => {
        return (
            <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
                <div className="form-content">
                    <div className="form-group">
                        <h3 className="form-heading">ADD VEHICLE</h3>
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.BRAND}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Chevrolet"
                            required
                            value={brand}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setBrand(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.MODEL}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Camaro"
                            required
                            value={model}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setModel(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.CONSTRUCTION_YEAR}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="2012"
                            required
                            value={constructionYear}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setConstructionYear(+e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.VEHICLE_TYPE}</label><br />
                        <select className="form-control"
                            id="exampleFormControlSelect1"
                            required
                            style={{width: '85%'}}
                            value={vehicleType}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setVehicleType(e.target.value); setError('')}}>
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
                            required
                            value={fuelType}
                            style={{width: '85%'}}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setFuelType(e.target.value); setError('')}}>
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
                            required
                            value={numberOfSeats}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNumberOfSeats(+e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.IMAGE}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Paste a link with an image of the vehicle"
                            required
                            minLength={3}
                            value={picture}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPicture(e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.AVAILABLE_VEHICLES}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="Number of vehicles available for rent"
                            required
                            value={availableVehicles}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAvailableVehicles(+e.target.value); setError('')}} />
                    </div>
                    <div className="form-group">
                        <label>{VehicleProperties.PRICE}</label><br />
                        <input type="text"
                            className="form-control"
                            placeholder="100$"
                            required
                            value={pricePerDay}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPricePerDay(+e.target.value); setError('')}} />
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
                <div style={{ position: 'absolute', top: '2%', left: '25%', zIndex: 2, width: '50%', height: 'auto', backgroundColor: 'black' }}>
                    <div className="close-button" onClick={() => handleModalClose()}>X</div>
                    {renderVehicleEditForm()}
                </div>
            </div> : <div></div>
    ))
}

export default VehicleAddModalComponent;
